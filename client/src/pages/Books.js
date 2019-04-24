import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import Axios from "axios";


class Books extends Component {
  state = {
    books: [],
    title: "",
    authors: "",
    description: "",
    search: [],
    favorites: []
  };

  componentDidMount() {
    this.loadBooks();
    // Populate the favorites list
    Axios.get('/api/books')
      .then(response => {
        console.log('Data recieved from mongo', response.data);
        this.setState({
          favorites: response.data
        })
      }).catch(err => {
        console.error(err);
      });
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data, title: "", authors: "", description: "" })
      )
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSearchFormSubmit = event => {
    event.preventDefault();
    if (this.state.title || this.state.author) {
      Axios.get("https://www.googleapis.com/books/v1/volumes?q=" + this.state.title + "+inauthor:" + this.state.author)
        .then(data => this.setState({ search: data.data.items }))
        .catch(function (error) { console.log(error) })
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12"><br></br>
            <Jumbotron>
              <h1>Search For Book</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Search By Title"
              />
              <Input
                value={this.state.author}
                onChange={this.handleInputChange}
                name="author"
                placeholder="Search By Author"
              />
              <FormBtn
                disabled={!(this.state.author || this.state.title)}
                onClick={this.handleSearchFormSubmit}
              >
                Search For Book
              </FormBtn>
            </form>
          </Col>
        
        </Row>
        <Row>
          <Col size="md-12"><br></br>
            <Jumbotron>
              <h1>Search Results</h1>
            </Jumbotron>
            {this.state.search.length ? (
              <List>
                {this.state.search.map(book => (
                  <ListItem key={book._id} id={book.id} title={book.volumeInfo.title} authors={book.volumeInfo.authors} description={book.volumeInfo.descriiption} > {/*image={book.volumeInfo.imageLinks.thumbnail}*/}
                    <Link to={"/books/" + book._id}>
                      <strong>
                        <p>Title: {book.volumeInfo.title}</p>
                        <p>Authors: {book.volumeInfo.authors}</p>
                        <p>Description: {book.volumeInfo.description}</p>
                        <p>Preview: {book.volumeInfo.previewLink}</p>
                        {/* <img src={book.volumeInfo.imageLinks.thumbnail} /> */}
                      </strong>
                    </Link>
                  </ListItem>
                ))}
              </List>
            ) : (
                <h3></h3>
              )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
