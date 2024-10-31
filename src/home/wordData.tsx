import {
  Document,
  ImageRun,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
} from "docx";
import { saveAs } from "file-saver";
import { Activities } from "./Home";
import { AuthUser } from "../store/auth.store";

export async function generateFromUrl(
  activitiesG1: Activities[],
  activitiesG2: Activities[],
  activitiesG3: Activities[],
  imagesArrayBuffersG1: ArrayBuffer[],
  imagesArrayBuffersG2: ArrayBuffer[],
  imagesArrayBuffersG3: ArrayBuffer[],
  allG1Points: string,
  allG2Points: string,
  allG3Points: string,
  user: AuthUser | null
) {
  const tablesG1 = activitiesG1.flatMap((item, index) => [
    new Table({
      rows: [
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph(`Nome da atividade: ${item.name}`)],
            }),
            new TableCell({
              children: [new Paragraph("Início: ")],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph(`Pontos: ${item.points.toString()}`)],
            }),
            new TableCell({
              children: [new Paragraph("Término: ")],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph("Grupo: 2")],
            }),
            new TableCell({
              children: [new Paragraph("Duração: ")],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph("Descrição: ")],
            }),
          ],
        }),
      ],
      columnWidths: [4505, 4505],
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: "",
        }),
      ],
    }),
  ]);

  const tablesG2 = activitiesG2.flatMap((item, index) => [
    new Table({
      rows: [
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph(`Nome da atividade: ${item.name}`)],
            }),
            new TableCell({
              children: [new Paragraph("Início: ")],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph(`Pontos: ${item.points.toString()}`)],
            }),
            new TableCell({
              children: [new Paragraph("Término: ")],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph("Grupo: 2")],
            }),
            new TableCell({
              children: [new Paragraph("Duração: ")],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph("Descrição: ")],
            }),
          ],
        }),
      ],
      columnWidths: [4505, 4505],
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: "",
        }),
      ],
    }),
  ]);

  const tablesG3 = activitiesG3.flatMap((item, index) => [
    new Table({
      rows: [
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph(`Nome da atividade: ${item.name}`)],
            }),
            new TableCell({
              children: [new Paragraph("Início: ")],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph(`Pontos: ${item.points.toString()}`)],
            }),
            new TableCell({
              children: [new Paragraph("Término: ")],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph("Grupo: 2")],
            }),
            new TableCell({
              children: [new Paragraph("Duração: ")],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph("Descrição: ")],
            }),
          ],
        }),
      ],
      columnWidths: [4505, 4505],
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: "",
        }),
      ],
    }),
  ]);

  const imagesG1 = imagesArrayBuffersG1.flatMap((item, index) => {
    return [
      new Paragraph({
        children: [
          new ImageRun({
            data: item,
            transformation: { width: 150, height: 150 },
            type: "png", // Tipo da imagem
          }),
        ],
      }),
    ];
  });

  const imagesG2 = imagesArrayBuffersG2.flatMap((item, index) => {
    return [
      new Paragraph({
        children: [
          new ImageRun({
            data: item,
            transformation: { width: 150, height: 150 },
            type: "png", // Tipo da imagem
          }),
        ],
      }),
    ];
  });

  const imagesG3 = imagesArrayBuffersG3.flatMap((item, index) => {
    return [
      new Paragraph({
        children: [
          new ImageRun({
            data: item,
            transformation: { width: 150, height: 150 },
            type: "png", // Tipo da imagem
          }),
        ],
      }),
    ];
  });

  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: "MINISTÉRIO DA EDUCAÇÃO",
                bold: true,
                size: 30,
                font: "Arial",
              }),
            ],
            alignment: "center",
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "UNIVERSIDADE TECNOLÓGICA FEDERAL DO PARANÁ",
                bold: true,
                size: 30,
                font: "Arial",
              }),
            ],
            alignment: "center",
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "DEPARTAMENTO ACADÊMICO DE COMPUTAÇÃO",
                bold: true,
                size: 30,
                font: "Arial",
              }),
            ],
            alignment: "center",
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Disciplina de Atividade Complementar",
                bold: true,
                size: 24,
                font: "Arial",
              }),
            ],
            alignment: "center",
            spacing: { after: 300 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "SUMÁRIO DE ATIVIDADES COMPLEMENTARES – DACOM",
                bold: true,
                size: 30,
                font: "Arial",
              }),
            ],
            alignment: "center",
            spacing: { after: 300 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Nome: ",
                size: 22,
                font: "Arial",
              }),
              new TextRun({
                text: `${user?.name}`,
                size: 22,
                font: "Arial",
              }),
            ],
            spacing: { after: 200 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Curso: ",
                size: 22,
                font: "Arial",
              }),
              new TextRun({
                text: `${user?.course}`,
                size: 22,
                font: "Arial",
              }),
            ],
            spacing: { after: 200 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Email: ",
                size: 22,
                font: "Arial",
              }),
              new TextRun({
                text: `${user?.email}`,
                size: 22,
                font: "Arial",
              }),
            ],
            spacing: { after: 200 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Código do aluno: ",
                size: 22,
                font: "Arial",
              }),
              new TextRun({
                text: `${user?.Ra ? user?.Ra : ""}`,
                size: 22,
                font: "Arial",
              }),
            ],
            spacing: { after: 200 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Código do curso: ",
                size: 22,
                font: "Arial",
              }),
              new TextRun({
                text: "2142660",
                size: 22,
                font: "Arial",
              }),
            ],
            spacing: { after: 300 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Grupo 1",
                bold: true,
                size: 24,
                font: "Arial",
              }),
            ],
            spacing: { after: 200 },
          }),
          ...tablesG1,
          new Paragraph({
            children: [
              new TextRun({
                text: "Grupo 2",
                bold: true,
                size: 24,
                font: "Arial",
              }),
            ],
            spacing: { after: 200 },
          }),
          ...tablesG2,
          new Paragraph({
            children: [
              new TextRun({
                text: "Grupo 3",
                bold: true,
                size: 24,
                font: "Arial",
              }),
            ],
            spacing: { after: 200 },
          }),
          ...tablesG3,
          new Paragraph({
            children: [
              new TextRun({
                text: "Total de pontos",
                bold: true,
                size: 24,
                font: "Arial",
              }),
            ],
            spacing: { after: 200 },
          }),
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph(`Grupo 1`)],
                  }),
                  new TableCell({
                    children: [new Paragraph(`Grupo 2`)],
                  }),
                  new TableCell({
                    children: [new Paragraph(`Grupo 3`)],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph(allG1Points)],
                  }),
                  new TableCell({
                    children: [new Paragraph(allG2Points)],
                  }),
                  new TableCell({
                    children: [new Paragraph(allG3Points)],
                  }),
                ],
              }),
            ],
            columnWidths: [2000, 2000, 2000],
          }),
        ],
      },
      {
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: "Certificados",
                bold: true,
                size: 30,
                font: "Arial",
              }),
            ],
            alignment: "center",
            spacing: { after: 300, before: 300 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Grupo 1",
                bold: true,
                size: 24,
                font: "Arial",
              }),
            ],
            spacing: { after: 200 },
          }),
          ...imagesG1,
          new Paragraph({
            children: [
              new TextRun({
                text: "Grupo 2",
                bold: true,
                size: 24,
                font: "Arial",
              }),
            ],
            spacing: { after: 200 },
          }),
          ...imagesG2,
          new Paragraph({
            children: [
              new TextRun({
                text: "Grupo 3",
                bold: true,
                size: 24,
                font: "Arial",
              }),
            ],
            spacing: { after: 200 },
          }),
          ...imagesG3,
        ],
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, "example.docx");
  });
}
