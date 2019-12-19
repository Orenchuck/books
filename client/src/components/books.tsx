import React, { Fragment } from 'react';

interface BookType {
    id: string,
    title: string,
    price: number,
}

export class Books extends React.Component {
    state = {
        books: [],
    }

    getAllBooks = () => {
        const loginRoute = `https://localhost:443/books`;
        fetch(loginRoute, {
            method: "get",
        })
            .then(response => response.json())
            .then((res) => {
                console.log(res);
            //    const a = res.map((book: any) => {
            //         let allBooks = [];
            //         allBooks.push(book);
            //         this.setState({
            //             books: allBooks,
            //         })
                // })

                // li = res.map((id: string, title: string, price: number) => (
                //     <li key={id}>
                //         <hr />
                //         <h4>{title}</h4>
                //         <div>price: {price}</div>
                //         <hr />
                //     </li>
                // ))
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        const { books } = this.state;
        return (
            <Fragment>
                <div>All Books</div>
                <ul>
                    {books.map(({id, title, price}) => (
                            <li key={id}>
                        <hr />
                        <h4>{title}</h4>
                        <div>price: {price}</div>
                        <hr />
                    </li>))}
                </ul>
            </Fragment>
        )
    }
}
