export const convertHtmlToPlainText = (description: string): string => {
    try {
        // Sử dụng DOMParser để chuyển đổi HTML sang text
        const parser = new DOMParser();
        const doc = parser.parseFromString(description, "text/html");
        return doc.body.textContent || ""; // Lấy text thuần từ nội dung HTML
    } catch (error) {
        console.error("Error converting HTML to plain text:", error);
        return ""; // Trả về chuỗi rỗng nếu xảy ra lỗi
    }
};
// export const createEditorState = (content: string): EditorState => {
//     let contentState: ContentState;
//
//     try {
//         // Kiểm tra và chuyển đổi chuỗi JSON thành ContentState nếu có thể
//         contentState = content
//             ? convertFromRaw(JSON.parse(content))
//             : ContentState.createFromText("");
//     } catch (error) {
//         // Nếu không phải JSON hợp lệ, tạo ContentState từ văn bản thuần túy
//         contentState = ContentState.createFromText(content || "");
//     }
//
//     return EditorState.createWithContent(contentState);
// };
export const getWordCount = (content: string) => {
    return content.trim().split(/\s+/).length;
};