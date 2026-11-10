import sys, json
from pathlib import Path
sys.path.insert(0, str(Path('tmp/pdf-deps').resolve()))
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, KeepTogether
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
import pymupdf as fitz
jobs = json.loads(Path('src/data/resume.json').read_text(encoding='utf-8-sig'))
styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name='NameCV', fontName='Helvetica-Bold', fontSize=24, leading=29, textColor=HexColor('#3d111d'), spaceAfter=10))
styles.add(ParagraphStyle(name='SectionCV', fontName='Helvetica-Bold', fontSize=13, leading=18, textColor=HexColor('#722b43'), spaceBefore=16, spaceAfter=12))
styles.add(ParagraphStyle(name='JobCV', fontName='Helvetica-Bold', fontSize=10, leading=14, spaceAfter=4))
styles.add(ParagraphStyle(name='BodyCV', fontName='Helvetica', fontSize=9, leading=13, spaceAfter=8))
styles.add(ParagraphStyle(name='DateCV', fontName='Helvetica', fontSize=8, leading=11, textColor=HexColor('#6b5960'), spaceAfter=5))
def footer(canvas, doc):
    canvas.setFont('Helvetica', 8)
    canvas.setFillColor(HexColor('#6b5960'))
    canvas.drawString(42, 25, 'Laura Camila Gómez | UX/UI & Product Design')
    canvas.drawRightString(A4[0]-42, 25, str(doc.page))
for lang in ['es','en']:
    es = lang == 'es'
    out = Path(f'public/cv/Laura-Camila-Gomez-CV-{lang}.pdf')
    story = []
    def p(text, style='BodyCV'): return Paragraph(text, styles[style])
    story += [p('Laura Camila Gómez','NameCV'),p('UX/UI &amp; Product Designer','JobCV'),p('Bogotá, Colombia | +57 302 657 26 08<br/><link href="mailto:camilagomez2307@gmail.com">camilagomez2307@gmail.com</link> | <link href="https://www.linkedin.com/in/lauracamilag/">linkedin.com/in/lauracamilag/</link>'),p('EXPERIENCIA PROFESIONAL' if es else 'WORK EXPERIENCE','SectionCV')]
    for index, job in enumerate(jobs):
        if index in (4, 9):
            story += [PageBreak(), p(('EXPERIENCIA PROFESIONAL (CONT.)' if es else 'WORK EXPERIENCE (CONT.)') if index == 4 else ('EXPERIENCIA ANTERIOR' if es else 'PREVIOUS EXPERIENCE'), 'SectionCV')]
        block = [p(job['role']+' | '+job['company'],'JobCV'), p(job['date'][lang],'DateCV')]
        if job.get('summary'): block.append(p(job['summary'][lang]))
        if job.get('clients'): block.append(p(('<b>Clientes:</b> ' if es else '<b>Clients:</b> ') + ', '.join(job['clients'])))
        story.append(KeepTogether(block + [Spacer(1,7)]))
    story += [p('FORMACIÓN ACADÉMICA' if es else 'EDUCATION','SectionCV'),p('Máster Universitario en Gráfico Digital' if es else 'Master’s Degree in Digital Graphic Design','JobCV'),p('UNIR - Universidad Internacional de La Rioja | 2018 - 2019'),p('Diseño Gráfico' if es else 'Graphic Design','JobCV'),p('IUDC - Universitaria de Colombia | 2013 - 2016'),p('HABILIDADES TÉCNICAS' if es else 'TECHNICAL SKILLS','SectionCV')]
    skills = [
      ('Investigación','Análisis de datos y mapas de calor, benchmarking, encuestas e informes con insights y recomendaciones.') if es else ('Research','Data and heatmap analysis, competitive benchmarking, surveys, insights, and strategic recommendations.'),
      ('Diseño','Interfaces, wireframes, sistemas de diseño, arquitectura de información, mockups y presentaciones.') if es else ('Design','Interfaces, wireframes, design systems, information architecture, mockups, and presentations.'),
      ('Prototipado','Prototipos interactivos, animación de interfaces y pruebas de usabilidad.') if es else ('Prototyping','Interactive prototypes, interface animation, and usability testing.'),
      ('Colaboración','Trabajo en equipo, comunicación con clientes y presentación de propuestas de diseño.') if es else ('Collaboration','Teamwork, client communication, and presentation of design proposals.'),
      ('Front-end','HTML, CSS, frameworks CSS y sistemas de gestión de contenido (CMS).') if es else ('Front-end','HTML, CSS, CSS frameworks, and content management systems (CMS).')]
    for title, text in skills: story.append(p(f'<b>{title}:</b> {text}'))
    SimpleDocTemplate(str(out),pagesize=A4,rightMargin=42,leftMargin=42,topMargin=36,bottomMargin=42,title='Laura Camila Gómez - CV',author='Laura Camila Gómez').build(story,onFirstPage=footer,onLaterPages=footer)
    doc=fitz.open(out)
    print(f'{out}: {len(doc)} pages')
    for i,page in enumerate(doc): page.get_pixmap(matrix=fitz.Matrix(1.2,1.2)).save(f'tmp/pdfs/cv-{lang}-{i+1}.png')
