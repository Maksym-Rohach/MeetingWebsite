import React from "react";
import { connect } from 'react-redux';
import get from "lodash.get";
import { push } from 'react-router-redux';
import * as getListActions from './reducer';
import EclipseWidget from '../../../eclipse';
import Select from 'react-select';
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Container
} from "reactstrap";

class Tables extends React.Component {

  state = {isLoading: true,}

  handleChange = (name, selectValue) => {
    this.setState({ [name]: selectValue }, this.filterSearchData);}

 

  componentDidMount = () => {
  this.props.getAdminsData();}

  render() {
    
    const { listAdmins, isListLoading } = this.props;
    console.log("---state--------------------------------", this.state);
    console.log("---props--------------------------------", this.props);
    let counter = 1;
    return (
      <>
      <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <Row>
                  <Col className="col-md-2">
                  <CardTitle tag="h4">Таблиця Адмінов</CardTitle>
                  </Col>
                  
                  </Row>                 
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                      <th>#</th>
                      <th>Нікнейм</th>
                      {/* <th>ID</th> */}
                      </tr>
                    </thead>
                    <tbody className="align-items-center">
                    {
                        listAdmins.map(item => {
                          return (<tr key={item.id}>
                            <td>{counter++}</td>
                            <td>{item.name}</td>
                            {/* <td>{item.id}</td> */}
                          </tr>
                          )
                        })
                      }
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  console.log("State=======", state);
  return {
    listAdmins: get(state, "adminTable.list.data"),
    isListLoading: get(state, "adminTable.list.loading"),  
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAdminsData: filter => {
      dispatch(getListActions.getAdminsData(filter));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tables);

