"""
generate_datasets.py
====================
Generates all 12 real-world test datasets for the ABB Maintenance Intelligence Platform.
Run from the project root:
    python dataset/generate_datasets.py
"""
import csv
import random
import math
import os

OUTDIR = os.path.dirname(os.path.abspath(__file__))
random.seed(42)

def write_csv(filename, headers, rows):
    path = os.path.join(OUTDIR, filename)
    with open(path, 'w', newline='') as f:
        w = csv.writer(f)
        w.writerow(headers)
        w.writerows(rows)
    print(f"  [OK] {filename}  ({len(rows)} rows)")

AI4I_HEADERS = [
    "Product ID","Type",
    "Air temperature [K]","Process temperature [K]",
    "Rotational speed [rpm]","Torque [Nm]","Tool wear [min]",
    "Machine failure","TWF","HDF","PWF","OSF","RNF"
]

def ai4i_row(uid, t, air, proc, rpm, torque, wear, fail=0, twf=0, hdf=0, pwf=0, osf=0, rnf=0):
    return [uid, t, round(air,1), round(proc,1), int(rpm), round(torque,1), int(wear),
            fail, twf, hdf, pwf, osf, rnf]

def jitter(base, pct=0.02):
    return base * (1 + random.uniform(-pct, pct))

# ────────────────────────────────────────────────────────────────────────────
print("\nGenerating AI4I 2020 datasets…")

# 01 — Normal Operation (healthy machine, no faults)
rows = []
for i in range(30):
    rows.append(ai4i_row(
        f"M-001-{i+1:03d}", "M",
        air=jitter(298.0), proc=jitter(308.6),
        rpm=jitter(1550, 0.03), torque=jitter(38.5, 0.05),
        wear=40 + i * 2,  # wear slowly climbs but stays well below 200
    ))
write_csv("01_normal_operation.csv", AI4I_HEADERS, rows)

# 02 — Tool Wear Failure (TWF): wear >= 200 min
rows = []
for i in range(30):
    wear = 160 + i * 3   # reaches 247 at last row
    rows.append(ai4i_row(
        f"M-002-{i+1:03d}", "M",
        air=jitter(299.2), proc=jitter(309.4),
        rpm=jitter(1430, 0.02), torque=jitter(42.0, 0.04),
        wear=wear,
        fail=1 if wear >= 200 else 0,
        twf=1 if wear >= 200 else 0,
    ))
write_csv("02_tool_wear_failure.csv", AI4I_HEADERS, rows)

# 03 — Overstrain Failure (OSF): tool_wear × torque > 11 000
rows = []
for i in range(30):
    wear = 130 + i * 4        # 130 → 246
    torque = 55.0 + i * 0.8  # 55 → 77.2
    osf = 1 if wear * torque > 11000 else 0
    rows.append(ai4i_row(
        f"M-003-{i+1:03d}", "H",
        air=jitter(300.0), proc=jitter(311.0),
        rpm=jitter(1380, 0.02), torque=torque,
        wear=wear,
        fail=osf, osf=osf,
    ))
write_csv("03_overstrain_failure.csv", AI4I_HEADERS, rows)

# 04 — Heat Dissipation Failure (HDF): delta_T < 8.6 K AND rpm < 1380
rows = []
for i in range(30):
    air = 302.0 + i * 0.1
    proc = air + 7.0 + random.uniform(-0.5, 0.5)  # delta < 8.6
    rpm = 1350 - i * 2   # RPM drops below 1380
    hdf = 1 if (proc - air < 8.6 and rpm < 1380) else 0
    rows.append(ai4i_row(
        f"M-004-{i+1:03d}", "L",
        air=air, proc=proc,
        rpm=rpm, torque=jitter(44.0, 0.04),
        wear=jitter(80, 0.05),
        fail=hdf, hdf=hdf,
    ))
write_csv("04_heat_dissipation_failure.csv", AI4I_HEADERS, rows)

# 05 — Power Failure (PWF): power > 9000 W  (P = torque × rpm × 0.1047)
rows = []
for i in range(30):
    rpm = 1600 + i * 20    # 1600 → 2180
    torque = 48.0 + i * 1.2  # torque climbs
    power = torque * rpm * 0.1047
    pwf = 1 if power > 9000 else 0
    rows.append(ai4i_row(
        f"M-005-{i+1:03d}", "H",
        air=jitter(298.5), proc=jitter(309.0),
        rpm=rpm, torque=torque,
        wear=jitter(90, 0.05),
        fail=pwf, pwf=pwf,
    ))
write_csv("05_power_failure.csv", AI4I_HEADERS, rows)

# 06 — Compound Fault: OSF + TWF (worst case)
rows = []
for i in range(30):
    wear = 180 + i * 3    # 180 → 267
    torque = 62.0 + i * 0.6
    osf = 1 if wear * torque > 11000 else 0
    twf = 1 if wear >= 200 else 0
    rows.append(ai4i_row(
        f"M-006-{i+1:03d}", "H",
        air=jitter(301.0), proc=jitter(311.5),
        rpm=jitter(1320, 0.02), torque=torque,
        wear=wear,
        fail=max(osf, twf), twf=twf, osf=osf,
    ))
write_csv("06_multi_fault_compound.csv", AI4I_HEADERS, rows)

# 07 — Bearing Degradation (high torque + increasing RPM deviation = wear proxy)
rows = []
for i in range(30):
    rpm = 1500 + random.choice([-1,1]) * random.randint(80, 300)  # erratic RPM
    torque = 52.0 + i * 0.9 + random.uniform(-3, 3)
    wear = 100 + i * 2
    rows.append(ai4i_row(
        f"M-007-{i+1:03d}", "M",
        air=jitter(299.5), proc=jitter(310.2),
        rpm=rpm, torque=torque,
        wear=wear,
        fail=1 if i > 20 else 0,
    ))
write_csv("07_bearing_degradation.csv", AI4I_HEADERS, rows)

# 08 — Early Warning / Trending (approaching failure, not yet triggered)
rows = []
for i in range(30):
    wear = 120 + i * 2.5  # peaks at ~192 (just below TWF threshold)
    torque = 40.0 + i * 0.5
    rows.append(ai4i_row(
        f"M-008-{i+1:03d}", "M",
        air=jitter(298.8), proc=jitter(309.0),
        rpm=jitter(1480, 0.03), torque=torque,
        wear=min(195, wear),
    ))
write_csv("08_early_warning_trending.csv", AI4I_HEADERS, rows)

# 09 — IRB-6700 Robot Arm healthy cycle
rows = []
for i in range(30):
    rows.append(ai4i_row(
        f"IRB-6700-{i+1:03d}", "H",
        air=jitter(297.5), proc=jitter(307.0),
        rpm=jitter(1620, 0.02), torque=jitter(34.2, 0.04),
        wear=20 + i,  # minimal wear, well within spec
    ))
write_csv("11_irb6700_healthy_cycle.csv", AI4I_HEADERS, rows)

# 10 — Pump-B vibration alert proxy (high torque swings, low RPM)
rows = []
for i in range(30):
    rpm = 1280 + random.choice([-1,1]) * random.randint(50, 200)
    torque = 58.0 + random.uniform(-8, 12)
    wear = 140 + i * 2
    rows.append(ai4i_row(
        f"PUMP-B-{i+1:03d}", "H",
        air=jitter(300.5), proc=jitter(309.8),
        rpm=rpm, torque=torque,
        wear=wear,
        fail=1 if i > 22 else 0,
    ))
write_csv("12_pump_b_vibration_alert.csv", AI4I_HEADERS, rows)

# ────────────────────────────────────────────────────────────────────────────
print("\nGenerating Turbofan Engine Degradation dataset (CMAPSS-style)…")

TURBOFAN_HEADERS = [
    "unit_number","time_cycles","op_setting_1","op_setting_2","op_setting_3",
    "fan_inlet_temp","LPC_outlet_temp","HPC_outlet_temp","LPT_outlet_temp",
    "fan_inlet_pressure","bypass_duct_pressure","HPC_outlet_pressure",
    "physical_fan_speed","physical_core_speed","engine_pressure_ratio",
    "HPC_outlet_static_pressure","fuel_flow_ratio",
    "corrected_fan_speed","corrected_core_speed","bypass_ratio",
    "bleed_enthalpy","demanded_fan_speed","demanded_corrected_fan_speed",
    "HPT_coolant_bleed","LPT_coolant_bleed","RUL"
]

turbo_rows = []
total_life = 250
for t in range(1, total_life + 1):
    deg = t / total_life  # 0→1 degradation
    rul = total_life - t
    turbo_rows.append([
        1, t,
        round(-0.0003 + random.uniform(-0.0001,0.0001), 4),
        round(0.0003 + random.uniform(-0.0001,0.0001), 4),
        round(100.0 + random.uniform(-0.5,0.5), 2),
        # Sensor readings — gradually degrade
        round(518.67 + deg * 8  + random.uniform(-1,1), 2),
        round(642.68 + deg * 12 + random.uniform(-1,1), 2),
        round(1589.7 + deg * 25 + random.uniform(-2,2), 2),
        round(1400.6 + deg * 18 + random.uniform(-2,2), 2),
        round(14.62  + random.uniform(-0.1,0.1), 2),
        round(21.61  - deg * 0.4 + random.uniform(-0.05,0.05), 2),
        round(554.36 + deg * 6 + random.uniform(-1,1), 2),
        round(2388.0 - deg * 30 + random.uniform(-5,5), 1),
        round(9046.2 - deg * 80 + random.uniform(-10,10), 1),
        round(1.30   + deg * 0.01 + random.uniform(-0.002,0.002), 4),
        round(47.47  + deg * 0.5 + random.uniform(-0.1,0.1), 2),
        round(521.66 + deg * 4 + random.uniform(-1,1), 2),
        round(2388.0 - deg * 25 + random.uniform(-5,5), 1),
        round(8138.6 - deg * 60 + random.uniform(-10,10), 1),
        round(8.4195 - deg * 0.05 + random.uniform(-0.01,0.01), 4),
        round(0.03  + random.uniform(-0.001,0.001), 4),
        round(392.0 - deg * 2 + random.uniform(-0.5,0.5), 2),
        round(2388.0 - deg * 20 + random.uniform(-5,5), 1),
        round(38.76 + deg * 0.3 + random.uniform(-0.05,0.05), 2),
        round(23.29 + deg * 0.2 + random.uniform(-0.05,0.05), 2),
        rul
    ])

write_csv("09_turbofan_degradation.csv", TURBOFAN_HEADERS, turbo_rows)

# ────────────────────────────────────────────────────────────────────────────
print("\nGenerating Battery Degradation dataset…")

BATTERY_HEADERS = [
    "cycle","voltage_measured","current_measured","temperature_measured",
    "current_load","voltage_load","time_sec","capacity_Ah","SOC_pct","health_pct"
]

battery_rows = []
initial_capacity = 2.0  # Ah
for cycle in range(1, 801):
    # Capacity fade — approximately 0.001 Ah per cycle
    capacity = max(0.8, initial_capacity - cycle * 0.0015 + random.uniform(-0.005, 0.005))
    soc = max(5, 100 - (cycle / 8) + random.uniform(-2, 2))
    health = max(60, 100 - (cycle / 8.5) + random.uniform(-1, 1))
    battery_rows.append([
        cycle,
        round(4.2 - cycle * 0.0004 + random.uniform(-0.05, 0.05), 4),
        round(-1.5 + random.uniform(-0.1, 0.1), 4),
        round(24.0 + cycle * 0.005 + random.uniform(-0.5, 0.5), 2),
        round(1.5 + random.uniform(-0.05, 0.05), 4),
        round(4.05 - cycle * 0.0003 + random.uniform(-0.05, 0.05), 4),
        round(4000 + random.uniform(-50, 50), 1),
        round(capacity, 4),
        round(soc, 1),
        round(health, 1),
    ])

write_csv("10_battery_degradation.csv", BATTERY_HEADERS, battery_rows)

print(f"\n[DONE] All datasets generated in: {OUTDIR}\n")
