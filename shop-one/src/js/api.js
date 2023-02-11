const bookResult = async (subject, finNumb, startNumb = 0) => {
    const obj = await fetch(`https://openlibrary.org/subjects/${subject}.json?limit=${finNumb}`);
    const result = await obj.json();
    const finResult = result.works.slice(startNumb, finNumb);
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
        let author = element.authors;

        if (element.title.length > 100) {
            htmlTitle = `${element.title.slice(0,100)}...`;
        } else {
            htmlTitle = `${element.title}`;
        }

        const title = htmlTitle;
        author.forEach(element => {
            return htmlAuthor = `by ${element.name}`;
        })
        const authorName = htmlAuthor;
        htmlCoverId = element.cover_id;
        let cover;
        if (htmlCoverId) {
            cover = `https://covers.openlibrary.org/b/id/${htmlCoverId}-M.jpg`;
        } else {
            cover = '';
        }

        let htmlObj = new bookElement(bookId, title, authorName, cover);
        htmlFull.push(htmlObj);
    });
    console.log(htmlFull)
    return htmlFull;
}

export default bookResult;
