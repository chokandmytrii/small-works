const bookSearch = async (title, finNumb, startNumb = 0) => {
    const obj = await fetch(`https://openlibrary.org/search.json?q=${title}`);
    const result = await obj.json();
    const finResult = result.docs.slice(startNumb, finNumb);
    console.log(finResult);

    let htmlFull = [];
    let htmlTitle = '';
    let htmlAuthor = '';
    let htmlCoverId;

    class bookElement {
        constructor(id, title, author, cover) {
            this.id = id;
            this.title = title;
            this.author = author;
            this.cover = cover;
        }
    }

    finResult.forEach(element => {
        let bookId = element.key.slice(7);

        if (element.title.length > 100) {
            htmlTitle = `${element.title.slice(0,100)}...`;
        } else {
            htmlTitle = `${element.title}`;
        }
        title = htmlTitle;

        if (Array.isArray(element.author_name)) {
            htmlAuthor = `by ${element.author_name[0]}`;
        } else {
            if (element.author_name) {
                htmlAuthor = `by ${element.author_name}`;
            } else {
                htmlAuthor = 'by Unknown';
            }
        }
        htmlCoverId = element.cover_i;
        let cover;
        if (!htmlCoverId) {
            cover = '';
        } else {
            cover = `https://covers.openlibrary.org/b/id/${htmlCoverId}-M.jpg`;
        }

        let htmlObj = new bookElement(bookId, title, htmlAuthor, cover);
        htmlFull.push(htmlObj);
    });
    console.log(htmlFull)
    return htmlFull;
}

export default bookSearch;
