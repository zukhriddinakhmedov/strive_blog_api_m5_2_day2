import PdfPrinter from "pdfmake"

export const getPdfReadableStream = data => {
    const fonts = {
        Helvetica: {
            normal: "Helvetica",
            bold: "Helvetica-blod",
        },
    }

    const printer = new PdfPrinter(fonts)

    const docDefinition = {
        content: [
            { text: data.title, style: "subHeader" },
            { text: data.category, style: "header" },
            { text: data.author.name, style: "subHeader" },
            { text: data.content }
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
            },
            subHeader: {
                fontSize: 14,
                bold: false
            }
        }
    }


    const pdfReadableStream = printer.createPdfKitDocument(docDefinition)

    pdfReadableStream.end()
    return pdfReadableStream
}
