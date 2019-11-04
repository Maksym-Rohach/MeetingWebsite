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
    console.log("totalCount COUNT",Math.ceil(this.props.totalCount/10));
    let pagesCount=Math.ceil(this.props.totalCount/10);
    let pages=[];
    let first=(currentPage==1)?1:currentPage-1;
    let dots=false;
    for(let i=first;i<pagesCount+1;i++)
    {
      if(i>first+3)
      {
        pages.push(pagesCount-2);
        pages.push(pagesCount-1);
        pages.push(pagesCount);
        break;
      }
      if(i==first+3)
      {
        pages.push(-1);
      }else pages.push(i);
    }
    console.log("CURENT PAGE ON PAGINATOR!!!!!!!!!!!!!!",currentPage);
    console.log("PROPS ON PAGINATOR",this.props);
   // console.log("TOTAL COUNT",pages);
    return (
            <Pagination>
                  <PaginationItem>
                    <PaginationLink previous tag="button"></PaginationLink>
                  </PaginationItem>

                  {pages.map(p => {
              return p === -1 ? (
                <PaginationItem disabled key={p}>
                  <PaginationLink tag="button">...</PaginationLink>
                </PaginationItem>
              ) : (
                <PaginationItem active={p === this.props.currentPage} key={p}>
                  <PaginationLink tag="button" onClick={()=>this.onPageChanged(p)}>
                    {p}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

                  <PaginationItem>
                    <PaginationLink next tag="button"></PaginationLink>
                  </PaginationItem>
            </Pagination>
     
    );
  }
}

export default Paginator;
