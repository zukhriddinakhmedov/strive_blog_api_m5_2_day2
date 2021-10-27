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
        content: [data.title, "Another paragraph, this time a little bit longer to make sure, this line will be divided into"],
        defaultStyle: {
            font: "Helvetica",
        },
    }


    const pdfReadableStream = printer.createPdfKitDocument(docDefinition)

    pdfReadableStream.end()
    return pdfReadableStream
}
