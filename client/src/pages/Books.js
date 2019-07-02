import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import DeleteBtn from "../components/DeleteBtn";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import bookAPI from "../utils/API";

class Books extends Component {
  // Initialize this.state.books as an empty array
  state = {
    books: [],
    title: "",
    author: "",
    synopsis: ""
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks() {
    bookAPI.getBooks()
      .then(res => this.setState({books: res.data}))
      .catch(err => console.log(err));
  }

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    const { name, value } = event.target;

    // Updating the input's state
    this.setState({
      [name]: value
    });
  };

  deleteBook = id => {
    console.log(id);
    bookAPI.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  }

  handleFormSubmit = event => {
    event.preventDefault();

    bookAPI.saveBook({  title: this.state.title,
                        author: this.state.author,
                        synopsis: this.state.synopsis
      }).then(res => this.loadBooks())
      .catch(err => console.log(err));
  }

  // Add code here to get all books from the database and save them to this.state.books

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>What Books Should I Read?</h1>
            </Jumbotron>
            <form>
              <Input name="title" placeholder="Title (required)" onChange={this.handleInputChange} />
              <Input name="author" placeholder="Author (required)" onChange={this.handleInputChange} />
              <TextArea name="synopsis" placeholder="Synopsis (Optional)" onChange={this.handleInputChange} />
              <FormBtn onClick={this.handleFormSubmit}>Submit Book</FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <a href={"/books/" + book._id}>
                      <strong>
                        {book.title} by {book.author}
                      </strong>
                    </a>
                    <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
