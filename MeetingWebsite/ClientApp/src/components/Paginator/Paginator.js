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
    constructor(props) {
        super(props);
        this.state = {

        };
    }


    onPageChanged(e){
        this.props.callBackParams(e);
      }

  render()    
  {
    const {currentPage}=this.props;
    let pagesCount=Math.ceil(this.props.totalCount);
    console.log("TOTAL COUNT",this.props);
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
