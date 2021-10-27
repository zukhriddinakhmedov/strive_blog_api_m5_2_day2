import PdfPrinter from "pdfmake"

export const getPdfReadableStream = data => {
    const fonts = {
        Roboto: {
            normal: "Helvetica",
            bold: "Helvetica-Bold",
        },
    }

    const printer = new PdfPrinter(fonts)



    const docDefinition = {
        content: [
            { text: data.title, style: "subHeader" },
            { text: data.category, style: "header" },
            { text: data.content, syle: "subHeader" }
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
