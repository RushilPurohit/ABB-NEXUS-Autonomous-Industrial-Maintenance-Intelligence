# ABB Maintenance Intelligence — Test Dataset

A curated set of real-world industrial test cases for validating the predictive maintenance models.
Each CSV is formatted to the **AI4I 2020 Predictive Maintenance** schema and will produce a distinct prediction when uploaded to the Machine Health page.

---

## Dataset Index

| File | Fault Type | Expected Prediction | Risk Level |
|------|-----------|---------------------|------------|
| `01_normal_operation.csv` | None | Normal Operation | 🟢 Healthy (<15%) |
| `02_tool_wear_failure.csv` | Tool Wear Failure (TWF) | Tool Wear Failure (TWF) | 🔴 Critical (>85%) |
| `03_overstrain_failure.csv` | Overstrain Failure (OSF) | Overstrain Failure (OSF) | 🔴 Critical (>90%) |
| `04_heat_dissipation_failure.csv` | Heat Dissipation Failure (HDF) | Heat Dissipation Failure (HDF) | 🟡 Warning (>70%) |
| `05_power_failure.csv` | Power Failure (PWF) | Power Failure (PWF) | 🟡 Warning (>65%) |
| `06_multi_fault_compound.csv` | OSF + TWF combined | Overstrain Failure (OSF) | 🔴 Critical (>95%) |
| `07_bearing_degradation.csv` | Vibration / Bearing | High Failure Risk | 🔴 Critical (>75%) |
| `08_early_warning_trending.csv` | Trending toward TWF | High Failure Risk | 🟡 Warning (40–60%) |
| `09_turbofan_degradation.csv` | Engine RUL Degradation | High Failure Risk | 🔴 Critical (>80%) |
| `10_battery_degradation.csv` | Battery SOC Degradation | High Failure Risk | 🟡 Warning (>55%) |
| `11_irb6700_healthy_cycle.csv` | Robot arm — normal | Normal Operation | 🟢 Healthy (<10%) |
| `12_pump_b_vibration_alert.csv` | Pump vibration fault | High Failure Risk | 🔴 Critical (>80%) |

---

## AI4I 2020 Column Schema (Required for /machine/predict)

```
Product ID, Type, Air temperature [K], Process temperature [K],
Rotational speed [rpm], Torque [Nm], Tool wear [min],
Machine failure, TWF, HDF, PWF, OSF, RNF
```

### Failure Logic (from backend evaluate_ai4i_row)

| Code | Trigger Condition |
|------|-------------------|
| **TWF** | Tool wear ≥ 200 min |
| **HDF** | (Process Temp − Air Temp) < 8.6 K AND RPM < 1380 |
| **PWF** | Power = Torque × RPM × 0.1047 > 9000 W OR < 110 W |
| **OSF** | Tool wear × Torque > 11,000 |

---

## Turbofan Engine (CMAPSS) Schema

```
unit_number, time_cycles, op_setting_1, op_setting_2, op_setting_3,
sensor_1..sensor_21
```

## Battery Usage Schema

```
cycle, voltage_measured, current_measured, temperature_measured,
current_load, voltage_load, time, capacity, SOC
```

---

## Usage

1. Go to **Machine Health** page in the app
2. Upload any CSV from this dataset
3. The AI4I model will analyze it and display:
   - Failure probability ring gauge
   - Predicted fault type
   - Feature importance bars
   - Sensor time-series charts
   - Technician recommendation

---

*Generated for ABB Nexus Maintenance Intelligence Platform · v2.0*
