import { Document, Packer, Paragraph, Table, TableCell, TableRow, TextRun, WidthType } from "docx";
import { saveAs } from "file-saver";
import { Activities } from "./Home";

export async function generateFromUrl(activitiesG2: Activities[]) {
  const headerRow = new TableRow({
    children: [
      new TableCell({
        children: [new Paragraph("Nome")],
        width: { size: 3505, type: WidthType.DXA },
      }),
      new TableCell({
        children: [new Paragraph("Pontos")],
        width: { size: 3505, type: WidthType.DXA },
      }),
    ],
  });

  // Linhas da tabela com os dados do backend
  const dataRows = activitiesG2.map((item) =>
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph(item.name)],
          width: { size: 3505, type: WidthType.DXA },
        }),
        new TableCell({
          children: [new Paragraph(item.points.toString())],
          width: { size: 3505, type: WidthType.DXA },
        }),
      ],
    })
  );

  const table = new Table({
    rows: [headerRow, ...dataRows], // Junta o cabeçalho e as linhas de dados
    columnWidths: [4505, 4505],
  });

  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: "SUMÁRIO DE ATIVIDADES COMPLEMENTARES – DACOM",
                bold: true,
                size: 32,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Nome:"
              }),
              new TextRun({
                text: "Natália Yumi"
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Curso:"
              }),
              new TextRun({
                text: "Engenharia de Computação"
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Email:"
              }),
              new TextRun({
                text: "natcam.2019@alunos.utfpr.edu.br"
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Código do aluno:"
              }),
              new TextRun({
                text: "2142660"
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Código do curso:"
              }),
              new TextRun({
                text: "2142660"
              }),
            ],
          }),
          new Paragraph({ text: "" }), // Espaço entre o título e a tabela
          table,
        ],
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, "example.docx");
  });
}