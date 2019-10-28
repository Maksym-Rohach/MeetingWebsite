import React from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Container,
  Button,
  Pagination, 
  PaginationItem,
  PaginationLink
} from "reactstrap";

class Paginator extends React.Component {
  render() {
    return (

            <Pagination>
                  <PaginationItem>
                    <PaginationLink previous tag="button"></PaginationLink>
                  </PaginationItem>
                  <PaginationItem active>
                    <PaginationLink tag="button">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink next tag="button"></PaginationLink>
                  </PaginationItem>
            </Pagination>
     
    );
  }
}

export default Paginator;
