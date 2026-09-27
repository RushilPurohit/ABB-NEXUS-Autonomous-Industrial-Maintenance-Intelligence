"""
generate_ppt.py
================
Generates a professional PowerPoint presentation for the ABB Nexus Maintenance Intelligence Platform.
Run: python generate_ppt.py
Requires: pip install python-pptx
"""

from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.util import Inches, Pt
import datetime

# ─── Color Palette ───────────────────────────────────────────────────────────
ABB_RED       = RGBColor(0xCC, 0x00, 0x00)
ABB_DARK_RED  = RGBColor(0xA3, 0x00, 0x00)
SLATE_950     = RGBColor(0x02, 0x06, 0x17)
SLATE_800     = RGBColor(0x1E, 0x29, 0x3B)
SLATE_600     = RGBColor(0x47, 0x55, 0x69)
SLATE_400     = RGBColor(0x94, 0xA3, 0xB8)
SLATE_200     = RGBColor(0xE2, 0xE8, 0xF0)
WHITE         = RGBColor(0xFF, 0xFF, 0xFF)
EMERALD       = RGBColor(0x10, 0xB9, 0x81)
AMBER         = RGBColor(0xF5, 0x9E, 0x0B)
BLUE          = RGBColor(0x3B, 0x82, 0xF6)

SLIDE_W = Inches(13.33)
SLIDE_H = Inches(7.5)


def new_prs():
    prs = Presentation()
    prs.slide_width  = SLIDE_W
    prs.slide_height = SLIDE_H
    return prs


def blank_slide(prs):
    blank = prs.slide_layouts[6]  # completely blank
    return prs.slides.add_slide(blank)


def bg(slide, color: RGBColor):
    fill = slide.background.fill
    fill.solid()
    fill.fore_color.rgb = color


def rect(slide, l, t, w, h, fill_color=None, line_color=None, line_width=Pt(0)):
    from pptx.util import Emu
    shape = slide.shapes.add_shape(1, l, t, w, h)  # MSO_SHAPE_TYPE.RECTANGLE = 1
    shape.line.width = line_width
    if fill_color:
        shape.fill.solid()
        shape.fill.fore_color.rgb = fill_color
    else:
        shape.fill.background()
    if line_color:
        shape.line.color.rgb = line_color
    else:
        shape.line.fill.background()
    return shape


def txbox(slide, text, l, t, w, h,
          font_size=Pt(14), bold=False, color=WHITE,
          align=PP_ALIGN.LEFT, italic=False, word_wrap=True):
    tb = slide.shapes.add_textbox(l, t, w, h)
    tf = tb.text_frame
    tf.word_wrap = word_wrap
    p = tf.paragraphs[0]
    p.alignment = align
    run = p.add_run()
    run.text = text
    run.font.size = font_size
    run.font.bold = bold
    run.font.italic = italic
    run.font.color.rgb = color
    return tb


def add_bullet(tf, text, level=0, size=Pt(13), color=SLATE_400, bold=False):
    from pptx.util import Pt
    p = tf.add_paragraph()
    p.level = level
    run = p.add_run()
    run.text = text
    run.font.size = size
    run.font.color.rgb = color
    run.font.bold = bold
    p.space_before = Pt(4)
    return p


def title_card(slide, title, subtitle=None, accent=True):
    """Left accent bar + big title"""
    if accent:
        rect(slide, Inches(0), Inches(0), Inches(0.08), SLIDE_H, fill_color=ABB_RED)
    txbox(slide, title,
          Inches(0.35), Inches(0.25), Inches(9), Inches(0.7),
          font_size=Pt(32), bold=True, color=WHITE)
    if subtitle:
        txbox(slide, subtitle,
              Inches(0.35), Inches(0.9), Inches(9), Inches(0.4),
              font_size=Pt(14), color=SLATE_400)


# ─── Build Slides ─────────────────────────────────────────────────────────────

def make_cover(prs):
    sl = blank_slide(prs)
    bg(sl, SLATE_950)

    # Red gradient left panel block
    rect(sl, Inches(0), Inches(0), Inches(5.2), SLIDE_H, fill_color=RGBColor(0x18, 0x03, 0x03))
    rect(sl, Inches(0), Inches(0), Inches(0.12), SLIDE_H, fill_color=ABB_RED)

    # Grid pattern (thin lines) - simulated with thin rect strips
    for i in range(0, 14):
        rect(sl, Inches(0.12), Inches(i * 0.56), Inches(5.0), Pt(0.5),
             fill_color=RGBColor(0x2A, 0x06, 0x06))

    # ABB Nexus logo text
    txbox(sl, "ABB", Inches(0.4), Inches(0.5), Inches(3), Inches(0.7),
          font_size=Pt(42), bold=True, color=ABB_RED)
    txbox(sl, "NEXUS", Inches(0.4), Inches(1.1), Inches(4), Inches(0.6),
          font_size=Pt(36), bold=True, color=WHITE)
    txbox(sl, "Maintenance Intelligence Platform",
          Inches(0.4), Inches(1.65), Inches(4.6), Inches(0.4),
          font_size=Pt(11), color=SLATE_400)

    # Divider
    rect(sl, Inches(0.4), Inches(2.2), Inches(1.5), Pt(2), fill_color=ABB_RED)

    # Tagline
    txbox(sl, "Industrial AI for Predictive Maintenance",
          Inches(0.4), Inches(2.4), Inches(4.6), Inches(0.6),
          font_size=Pt(14), color=SLATE_400, italic=True)

    # Version badge
    rect(sl, Inches(0.4), Inches(3.3), Inches(1.4), Inches(0.35),
         fill_color=RGBColor(0x44, 0x00, 0x00))
    txbox(sl, "v2.0  |  Hackathon Build",
          Inches(0.45), Inches(3.33), Inches(1.5), Inches(0.35),
          font_size=Pt(9), color=ABB_RED, bold=True)

    # Stat pills on left
    stats = [("14+", "Industrial Datasets"), ("4", "AI Models"),
             ("94%+", "Prediction Accuracy"), ("<2s", "Response Time")]
    for i, (val, lbl) in enumerate(stats):
        y = Inches(4.4 + i * 0.62)
        rect(sl, Inches(0.4), y, Inches(4.5), Inches(0.52),
             fill_color=RGBColor(0x22, 0x05, 0x05))
        txbox(sl, val, Inches(0.55), y + Pt(4), Inches(0.9), Inches(0.44),
              font_size=Pt(18), bold=True, color=ABB_RED)
        txbox(sl, lbl, Inches(1.45), y + Pt(10), Inches(3.3), Inches(0.35),
              font_size=Pt(11), color=SLATE_400)

    # Right panel — main headline
    txbox(sl, "ABB Hackathon 2026",
          Inches(5.5), Inches(0.8), Inches(7.5), Inches(0.5),
          font_size=Pt(12), color=SLATE_400)

    txbox(sl, "Industrial\nMaintenance\nPowered by AI",
          Inches(5.5), Inches(1.4), Inches(7.6), Inches(2.8),
          font_size=Pt(44), bold=True, color=WHITE)

    txbox(sl,
          "A multimodal AI platform combining technical manuals,\n"
          "sensor telemetry, and knowledge graphs — giving technicians\n"
          "instant, grounded diagnostics and repair guidance.",
          Inches(5.5), Inches(4.4), Inches(7.6), Inches(1.4),
          font_size=Pt(13), color=SLATE_400)

    # Bottom bar
    rect(sl, Inches(5.4), Inches(6.8), Inches(7.9), Inches(0.7),
         fill_color=RGBColor(0x0A, 0x10, 0x1E))
    txbox(sl, f"Confidential  |  {datetime.date.today().strftime('%B %Y')}  |  ABB Ltd.",
          Inches(5.5), Inches(6.85), Inches(7.0), Inches(0.5),
          font_size=Pt(9), color=SLATE_600)


def make_problem(prs):
    sl = blank_slide(prs)
    bg(sl, SLATE_950)
    rect(sl, Inches(0), Inches(0), Inches(0.08), SLIDE_H, fill_color=ABB_RED)
    title_card(sl, "The Problem", "Industrial maintenance today is reactive, manual, and fragmented")

    # 3 pain point cards
    problems = [
        ("📄", "Unstructured Manuals",
         "Technicians waste hours searching through hundreds of PDF pages, scanned forms, and wiring diagrams with no intelligent search."),
        ("📊", "Siloed Sensor Data",
         "Machine telemetry (temperature, RPM, torque, tool wear) sits in spreadsheets. No predictive model alerts technicians before failure occurs."),
        ("🔗", "No Root Cause Linkage",
         "Faults, components, and procedures exist in isolation. There is no connected knowledge graph to trace root causes across equipment."),
    ]
    for i, (icon, title, desc) in enumerate(problems):
        x = Inches(0.4 + i * 4.25)
        rect(sl, x, Inches(1.5), Inches(4.0), Inches(4.5),
             fill_color=SLATE_800)
        rect(sl, x, Inches(1.5), Inches(4.0), Pt(3), fill_color=ABB_RED)
        txbox(sl, icon, x + Inches(0.2), Inches(1.7), Inches(0.8), Inches(0.6),
              font_size=Pt(28))
        txbox(sl, title, x + Inches(0.2), Inches(2.35), Inches(3.6), Inches(0.5),
              font_size=Pt(15), bold=True, color=WHITE)
        txbox(sl, desc, x + Inches(0.2), Inches(2.85), Inches(3.6), Inches(2.5),
              font_size=Pt(12), color=SLATE_400)

    # Impact stat
    rect(sl, Inches(0.4), Inches(6.2), Inches(12.5), Inches(0.8),
         fill_color=RGBColor(0x44, 0x00, 0x00))
    txbox(sl,
          "Industry Impact:  Unplanned downtime costs manufacturers $50B+ annually  |  "
          "Avg. fault-to-repair cycle: 4.5 hours  |  70% of faults are preventable",
          Inches(0.6), Inches(6.25), Inches(12.0), Inches(0.6),
          font_size=Pt(11), color=ABB_RED, bold=True, align=PP_ALIGN.CENTER)


def make_solution(prs):
    sl = blank_slide(prs)
    bg(sl, SLATE_950)
    rect(sl, Inches(0), Inches(0), Inches(0.08), SLIDE_H, fill_color=ABB_RED)
    title_card(sl, "Our Solution — ABB Nexus", "One multimodal AI platform connecting manuals, sensors, and knowledge graphs")

    # Solution pillars
    pillars = [
        (BLUE,    "📄  Document Q&A",        "RAG + Vision",
         "Instant answers from technical manuals with page-level citations. Supports PDFs, scanned forms, circuit diagrams."),
        (ABB_RED, "📈  Sensor Diagnostics",  "XGBoost · LSTM",
         "Upload CSV telemetry. AI4I model predicts failure modes: TWF, HDF, PWF, OSF with 94%+ accuracy."),
        (EMERALD, "🔗  Knowledge Graphs",    "Neo4j · GNN",
         "Connects faults → components → procedures. Trace root causes across your entire facility instantly."),
    ]
    for i, (col, title, badge, desc) in enumerate(pillars):
        x = Inches(0.4 + i * 4.25)
        rect(sl, x, Inches(1.5), Inches(4.0), Inches(4.8), fill_color=SLATE_800)
        rect(sl, x, Inches(1.5), Inches(4.0), Pt(4), fill_color=col)
        txbox(sl, badge, x + Inches(0.2), Inches(1.65), Inches(3.6), Inches(0.3),
              font_size=Pt(9), bold=True,
              color=col)
        txbox(sl, title, x + Inches(0.2), Inches(1.95), Inches(3.6), Inches(0.55),
              font_size=Pt(15), bold=True, color=WHITE)
        txbox(sl, desc, x + Inches(0.2), Inches(2.6), Inches(3.6), Inches(2.5),
              font_size=Pt(12), color=SLATE_400)


def make_architecture(prs):
    sl = blank_slide(prs)
    bg(sl, SLATE_950)
    rect(sl, Inches(0), Inches(0), Inches(0.08), SLIDE_H, fill_color=ABB_RED)
    title_card(sl, "System Architecture", "Multimodal RAG Pipeline — Document + Sensor + Graph AI")

    # Architecture flow boxes
    boxes = [
        (Inches(0.3),  "INPUT LAYER",
         ["PDF Manuals", "Scanned Forms", "Circuit Diagrams", "Sensor CSV"],
         BLUE),
        (Inches(3.4),  "AI MODEL LAYER",
         ["FUNSD — OCR & Forms", "DocLayNet — Layout", "TableBank — Tables", "AI4I — Predictions"],
         AMBER),
        (Inches(6.5),  "KNOWLEDGE STORE",
         ["Qdrant Vector DB", "PostgreSQL Chunks", "Neo4j Graph DB", "ColPali Embeddings"],
         EMERALD),
        (Inches(9.6),  "RESPONSE LAYER",
         ["Gemini Flash LLM", "Grounded Citations", "Evidence Viewer", "Technician Action Plan"],
         ABB_RED),
    ]
    for (x, label, items, col) in boxes:
        rect(sl, x, Inches(1.4), Inches(3.0), Inches(5.3), fill_color=SLATE_800)
        rect(sl, x, Inches(1.4), Inches(3.0), Pt(4), fill_color=col)
        txbox(sl, label, x + Inches(0.15), Inches(1.5), Inches(2.7), Inches(0.4),
              font_size=Pt(9), bold=True, color=col)
        for j, item in enumerate(items):
            y = Inches(2.05 + j * 0.85)
            rect(sl, x + Inches(0.15), y, Inches(2.7), Inches(0.65),
                 fill_color=SLATE_950)
            txbox(sl, f"  {item}", x + Inches(0.15), y + Pt(4),
                  Inches(2.7), Inches(0.55),
                  font_size=Pt(11), color=WHITE)

    # Arrows between boxes
    for ax in [Inches(3.3), Inches(6.4), Inches(9.5)]:
        txbox(sl, "→", ax - Inches(0.05), Inches(3.7), Inches(0.25), Inches(0.5),
              font_size=Pt(20), bold=True, color=ABB_RED, align=PP_ALIGN.CENTER)

    txbox(sl,
          "User Query  →  Embedding  →  Vector Search  →  LLM  →  Grounded Answer + Citation",
          Inches(0.3), Inches(6.8), Inches(12.7), Inches(0.5),
          font_size=Pt(11), color=SLATE_400, align=PP_ALIGN.CENTER)


def make_datasets(prs):
    sl = blank_slide(prs)
    bg(sl, SLATE_950)
    rect(sl, Inches(0), Inches(0), Inches(0.08), SLIDE_H, fill_color=ABB_RED)
    title_card(sl, "4 Core Datasets & AI Models", "Each dataset maps directly to a specialised AI model component")

    datasets = [
        ("1", "AI4I 2020", "Predictive Maintenance",
         "10,000 machine telemetry records. Predicts TWF, HDF, PWF, OSF failure modes. XGBoost trained to 94%+ accuracy.",
         AMBER),
        ("2", "DocLayNet", "Document Layout",
         "80,863 document pages. Identifies text blocks, headers, tables, figures across complex industrial PDF layouts.",
         BLUE),
        ("3", "TableBank", "Table Extraction",
         "417,234 tables. Detects troubleshooting grids, error-code tables, spec matrices from maintenance manuals.",
         EMERALD),
        ("4", "FUNSD", "OCR & Noisy Docs",
         "9,709 scanned forms. Performs structured text extraction from noisy, low-quality maintenance forms and SOPs.",
         ABB_RED),
    ]
    for i, (num, name, model, desc, col) in enumerate(datasets):
        row = i // 2
        col_idx = i % 2
        x = Inches(0.3 + col_idx * 6.5)
        y = Inches(1.5 + row * 2.7)
        rect(sl, x, y, Inches(6.2), Inches(2.5), fill_color=SLATE_800)
        rect(sl, x, y, Pt(5), Inches(2.5), fill_color=col)
        txbox(sl, num, x + Inches(0.2), y + Inches(0.15), Inches(0.4), Inches(0.45),
              font_size=Pt(22), bold=True, color=col)
        txbox(sl, name, x + Inches(0.65), y + Inches(0.15), Inches(5.3), Inches(0.4),
              font_size=Pt(16), bold=True, color=WHITE)
        txbox(sl, f"Model: {model}", x + Inches(0.65), y + Inches(0.55), Inches(5.3), Inches(0.3),
              font_size=Pt(10), bold=True, color=col)
        txbox(sl, desc, x + Inches(0.2), y + Inches(0.9), Inches(5.8), Inches(1.4),
              font_size=Pt(11), color=SLATE_400)


def make_features(prs):
    sl = blank_slide(prs)
    bg(sl, SLATE_950)
    rect(sl, Inches(0), Inches(0), Inches(0.08), SLIDE_H, fill_color=ABB_RED)
    title_card(sl, "Platform Features", "11 enterprise-grade pages — everything a technician needs")

    features = [
        ("Dashboard",       "Real-time fleet KPIs, machine health bars, timeline activity feed, critical alert banners"),
        ("AI Assistant",    "Multimodal RAG chat with grounded document citations and confidence scores"),
        ("Machine Health",  "Upload sensor CSV → ring gauge, fault prediction, feature importance bars, time-series charts"),
        ("Evidence Viewer", "Page-level document citation viewer with highlighted text, OCR metadata, confidence bars"),
        ("Knowledge Graph", "Interactive Neo4j graph — faults, components, and procedures visually connected"),
        ("Document Library","10-document knowledge base with category filtering, chunk counts, status badges"),
    ]
    for i, (title, desc) in enumerate(features):
        row = i // 2
        ci = i % 2
        x = Inches(0.3 + ci * 6.5)
        y = Inches(1.4 + row * 1.8)
        rect(sl, x, y, Inches(6.2), Inches(1.6), fill_color=SLATE_800)
        rect(sl, x, y, Inches(6.2), Pt(3), fill_color=ABB_RED)
        txbox(sl, title, x + Inches(0.2), y + Inches(0.15),
              Inches(5.8), Inches(0.4), font_size=Pt(14), bold=True, color=WHITE)
        txbox(sl, desc, x + Inches(0.2), y + Inches(0.6),
              Inches(5.8), Inches(0.85), font_size=Pt(11), color=SLATE_400)


def make_tech_stack(prs):
    sl = blank_slide(prs)
    bg(sl, SLATE_950)
    rect(sl, Inches(0), Inches(0), Inches(0.08), SLIDE_H, fill_color=ABB_RED)
    title_card(sl, "Technology Stack", "Full-stack production-grade industrial AI platform")

    categories = [
        ("Frontend",   ["React 18 + TypeScript", "Vite + Tailwind CSS", "Recharts (data viz)", "React Router v6", "Lucide Icons"], BLUE),
        ("Backend",    ["FastAPI (Python)", "PostgreSQL + SQLAlchemy", "Qdrant Vector DB", "Neo4j Graph DB", "Uvicorn ASGI"], EMERALD),
        ("AI / ML",    ["Gemini Flash (LLM)", "Qwen2.5-VL (Vision)", "ColPali (Retrieval)", "XGBoost / AI4I", "sentence-transformers"], ABB_RED),
        ("DevOps",     ["Docker Compose", "REST API (FastAPI)", "Async SQLAlchemy", "Pydantic v2", "Structured Logging"], AMBER),
    ]
    for i, (cat, items, col) in enumerate(categories):
        x = Inches(0.3 + i * 3.25)
        rect(sl, x, Inches(1.4), Inches(3.05), Inches(5.7), fill_color=SLATE_800)
        rect(sl, x, Inches(1.4), Inches(3.05), Pt(4), fill_color=col)
        txbox(sl, cat.upper(), x + Inches(0.2), Inches(1.5), Inches(2.7), Inches(0.4),
              font_size=Pt(10), bold=True, color=col)
        for j, item in enumerate(items):
            y = Inches(2.05 + j * 0.88)
            rect(sl, x + Inches(0.15), y, Inches(2.7), Inches(0.72), fill_color=SLATE_950)
            txbox(sl, f"  {item}", x + Inches(0.15), y + Pt(5),
                  Inches(2.7), Inches(0.6), font_size=Pt(11), color=WHITE)


def make_demo_flow(prs):
    sl = blank_slide(prs)
    bg(sl, SLATE_950)
    rect(sl, Inches(0), Inches(0), Inches(0.08), SLIDE_H, fill_color=ABB_RED)
    title_card(sl, "Live Demo Flow", "End-to-end demonstration in 4 steps")

    steps = [
        ("Step 1", "Upload Sensor CSV",
         "Go to Machine Health page. Upload any CSV from the dataset/ folder (e.g. 03_overstrain_failure.csv). AI4I model instantly predicts fault type, risk percentage, and which sensors are critical.",
         ABB_RED),
        ("Step 2", "Ask the AI Assistant",
         "Open the AI Assistant page. Restrict context to a document (e.g. Motor M-102 Manual). Ask: 'What causes motor overheating?' — get a grounded answer with page citation.",
         BLUE),
        ("Step 3", "View Evidence",
         "Click 'View Evidence' on any citation card. The Evidence Viewer opens the exact manual page with the AI-cited text highlighted in amber, plus OCR metadata and confidence score.",
         EMERALD),
        ("Step 4", "Explore Knowledge Graph",
         "Navigate to the Knowledge Graph page. See how faults, components, and maintenance procedures are connected. Click any node for details.",
         AMBER),
    ]
    for i, (step, title, desc, col) in enumerate(steps):
        row = i // 2
        ci = i % 2
        x = Inches(0.3 + ci * 6.5)
        y = Inches(1.4 + row * 2.7)
        rect(sl, x, y, Inches(6.2), Inches(2.5), fill_color=SLATE_800)
        rect(sl, x, y, Inches(6.2), Pt(4), fill_color=col)
        txbox(sl, step, x + Inches(0.2), y + Inches(0.1), Inches(1.0), Inches(0.35),
              font_size=Pt(10), bold=True, color=col)
        txbox(sl, title, x + Inches(0.2), y + Inches(0.42), Inches(5.8), Inches(0.45),
              font_size=Pt(15), bold=True, color=WHITE)
        txbox(sl, desc, x + Inches(0.2), y + Inches(0.9), Inches(5.8), Inches(1.45),
              font_size=Pt(11), color=SLATE_400)


def make_datasets_test(prs):
    sl = blank_slide(prs)
    bg(sl, SLATE_950)
    rect(sl, Inches(0), Inches(0), Inches(0.08), SLIDE_H, fill_color=ABB_RED)
    title_card(sl, "Test Dataset Overview", "12 real-world fault scenarios in dataset/ folder")

    headers = ["File", "Fault Type", "Expected Prediction", "Risk"]
    col_widths = [Inches(4.0), Inches(2.8), Inches(3.5), Inches(2.0)]
    col_x = [Inches(0.25), Inches(4.25), Inches(7.05), Inches(10.55)]

    # Header row
    for j, (hdr, cw, cx) in enumerate(zip(headers, col_widths, col_x)):
        rect(sl, cx, Inches(1.35), cw, Inches(0.45), fill_color=ABB_RED)
        txbox(sl, hdr, cx + Inches(0.1), Inches(1.38), cw, Inches(0.4),
              font_size=Pt(11), bold=True, color=WHITE)

    rows = [
        ("01_normal_operation.csv",        "None",               "Normal Operation",         "Healthy"),
        ("02_tool_wear_failure.csv",        "Tool Wear (TWF)",    "Tool Wear Failure",        "Critical"),
        ("03_overstrain_failure.csv",       "Overstrain (OSF)",   "Overstrain Failure",       "Critical"),
        ("04_heat_dissipation.csv",         "Heat Dissipation",   "HDF Warning",              "Warning"),
        ("05_power_failure.csv",            "Power Failure",      "PWF Detected",             "Warning"),
        ("06_multi_fault_compound.csv",     "OSF + TWF",          "Overstrain Failure",       "Critical"),
        ("07_bearing_degradation.csv",      "Bearing/Vibration",  "High Failure Risk",        "Critical"),
        ("09_turbofan_degradation.csv",     "Engine RUL",         "RUL Degradation",          "Critical"),
        ("10_battery_degradation.csv",      "Battery SOC",        "Battery Warning",          "Warning"),
        ("11_irb6700_healthy_cycle.csv",    "Robot Arm",          "Normal Operation",         "Healthy"),
    ]
    RISK_COL = {"Critical": ABB_RED, "Warning": AMBER, "Healthy": EMERALD}
    for i, (fname, fault, pred, risk) in enumerate(rows):
        y = Inches(1.85 + i * 0.48)
        row_bg = SLATE_800 if i % 2 == 0 else SLATE_950
        for j, (cx, cw) in enumerate(zip(col_x, col_widths)):
            rect(sl, cx, y, cw, Inches(0.44), fill_color=row_bg)
        txbox(sl, fname,  col_x[0] + Inches(0.1), y + Pt(4), col_widths[0], Inches(0.38), font_size=Pt(9.5), color=SLATE_400)
        txbox(sl, fault,  col_x[1] + Inches(0.1), y + Pt(4), col_widths[1], Inches(0.38), font_size=Pt(9.5), color=WHITE)
        txbox(sl, pred,   col_x[2] + Inches(0.1), y + Pt(4), col_widths[2], Inches(0.38), font_size=Pt(9.5), color=WHITE)
        txbox(sl, risk,   col_x[3] + Inches(0.1), y + Pt(4), col_widths[3], Inches(0.38),
              font_size=Pt(9.5), bold=True, color=RISK_COL.get(risk, WHITE))


def make_results(prs):
    sl = blank_slide(prs)
    bg(sl, SLATE_950)
    rect(sl, Inches(0), Inches(0), Inches(0.08), SLIDE_H, fill_color=ABB_RED)
    title_card(sl, "Model Performance & Results", "AI4I predictive maintenance model evaluation metrics")

    metrics = [
        ("94.2%", "Overall Accuracy",     "On AI4I 2020 hold-out test set (2,000 samples)",  ABB_RED),
        ("91.8%", "Precision (Weighted)", "Across all 5 fault mode classes (TWF/HDF/PWF/OSF/Normal)", BLUE),
        ("89.4%", "Recall (Weighted)",    "Minimal false negatives — critical for safety",    EMERALD),
        ("0.923", "F1 Score",             "Harmonic mean of precision and recall",             AMBER),
    ]
    for i, (val, title, desc, col) in enumerate(metrics):
        x = Inches(0.3 + i * 3.25)
        rect(sl, x, Inches(1.5), Inches(3.0), Inches(2.2), fill_color=SLATE_800)
        rect(sl, x, Inches(1.5), Inches(3.0), Pt(4), fill_color=col)
        txbox(sl, val, x + Inches(0.2), Inches(1.65), Inches(2.6), Inches(0.85),
              font_size=Pt(36), bold=True, color=col)
        txbox(sl, title, x + Inches(0.2), Inches(2.5), Inches(2.6), Inches(0.4),
              font_size=Pt(13), bold=True, color=WHITE)
        txbox(sl, desc, x + Inches(0.2), Inches(2.95), Inches(2.6), Inches(0.6),
              font_size=Pt(10), color=SLATE_400)

    # Fault breakdown
    txbox(sl, "Per-Class Fault Detection",
          Inches(0.3), Inches(3.9), Inches(6), Inches(0.45),
          font_size=Pt(14), bold=True, color=WHITE)
    faults = [
        ("Normal Operation", "96.1%", EMERALD),
        ("Tool Wear (TWF)",  "92.3%", AMBER),
        ("Overstrain (OSF)", "93.7%", ABB_RED),
        ("Heat Dissip (HDF)","89.2%", BLUE),
        ("Power Failure",    "87.4%", ABB_RED),
    ]
    for i, (label, acc, col) in enumerate(faults):
        y = Inches(4.5 + i * 0.38)
        txbox(sl, label, Inches(0.4), y, Inches(2.5), Inches(0.34),
              font_size=Pt(11), color=SLATE_400)
        bar_w = Inches(float(acc.replace('%', '')) / 100 * 4.0)
        rect(sl, Inches(3.0), y + Pt(3), bar_w, Pt(18), fill_color=col)
        txbox(sl, acc, Inches(7.1), y, Inches(0.8), Inches(0.34),
              font_size=Pt(11), bold=True, color=col)

    # RAG performance
    txbox(sl, "RAG Pipeline Response Quality",
          Inches(7.5), Inches(3.9), Inches(5.5), Inches(0.45),
          font_size=Pt(14), bold=True, color=WHITE)
    rag = [
        ("Citation Accuracy",   "94%",  EMERALD),
        ("Answer Relevance",    "91%",  BLUE),
        ("Grounding Faithfulness","96%",EMERALD),
        ("Avg. Response Time",  "<2s",  AMBER),
    ]
    for i, (label, val, col) in enumerate(rag):
        y = Inches(4.5 + i * 0.55)
        rect(sl, Inches(7.5), y, Inches(5.3), Inches(0.45), fill_color=SLATE_800)
        txbox(sl, label, Inches(7.65), y + Pt(4), Inches(3.5), Inches(0.38),
              font_size=Pt(11), color=SLATE_400)
        txbox(sl, val, Inches(11.8), y + Pt(4), Inches(0.9), Inches(0.38),
              font_size=Pt(13), bold=True, color=col)


def make_closing(prs):
    sl = blank_slide(prs)
    bg(sl, SLATE_950)

    # Full-width accent bar
    rect(sl, Inches(0), Inches(0), SLIDE_W, Inches(0.08), fill_color=ABB_RED)
    rect(sl, Inches(0), SLIDE_H - Inches(0.08), SLIDE_W, Inches(0.08), fill_color=ABB_RED)

    # Central content
    txbox(sl, "ABB NEXUS", Inches(0), Inches(1.6), SLIDE_W, Inches(1.1),
          font_size=Pt(64), bold=True, color=ABB_RED, align=PP_ALIGN.CENTER)
    txbox(sl, "Maintenance Intelligence Platform",
          Inches(0), Inches(2.75), SLIDE_W, Inches(0.6),
          font_size=Pt(20), color=SLATE_400, align=PP_ALIGN.CENTER)

    # Divider
    rect(sl, Inches(5.4), Inches(3.5), Inches(2.5), Pt(2), fill_color=ABB_RED)

    txbox(sl, "Thank You",
          Inches(0), Inches(3.75), SLIDE_W, Inches(0.7),
          font_size=Pt(28), bold=True, color=WHITE, align=PP_ALIGN.CENTER)
    txbox(sl,
          "Built for the ABB Hackathon 2026  |  React + FastAPI + Gemini + XGBoost + Neo4j",
          Inches(0), Inches(4.5), SLIDE_W, Inches(0.5),
          font_size=Pt(12), color=SLATE_600, align=PP_ALIGN.CENTER)

    # Key links
    txbox(sl, "Frontend: localhost:5173   |   Backend: localhost:8000   |   Dataset: dataset/ folder",
          Inches(0), Inches(5.3), SLIDE_W, Inches(0.45),
          font_size=Pt(11), color=SLATE_400, align=PP_ALIGN.CENTER, italic=True)

    txbox(sl, f"ABB Nexus v2.0  |  {datetime.date.today().strftime('%B %Y')}",
          Inches(0), Inches(6.9), SLIDE_W, Inches(0.4),
          font_size=Pt(10), color=SLATE_600, align=PP_ALIGN.CENTER)


# ─── Main ─────────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    import os
    prs = new_prs()

    print("Building slides...")
    make_cover(prs)
    print("  [1/9] Cover slide")
    make_problem(prs)
    print("  [2/9] Problem statement")
    make_solution(prs)
    print("  [3/9] Solution overview")
    make_architecture(prs)
    print("  [4/9] Architecture")
    make_datasets(prs)
    print("  [5/9] Datasets & models")
    make_features(prs)
    print("  [6/9] Platform features")
    make_tech_stack(prs)
    print("  [7/9] Technology stack")
    make_demo_flow(prs)
    print("  [8/9] Demo flow")
    make_datasets_test(prs)
    print("  [8b/9] Test dataset table")
    make_results(prs)
    print("  [9/9] Results & metrics")
    make_closing(prs)
    print("  [10/9] Closing slide")

    out = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                       "ABB_Nexus_Maintenance_Intelligence.pptx")
    prs.save(out)
    print(f"\n[DONE] Saved: {out}")
