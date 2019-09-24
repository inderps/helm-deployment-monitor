import React from 'react';
import PropTypes from 'prop-types';
import {
  Container, Row, Col, Card, Button, ButtonToolbar, Badge
} from 'react-bootstrap';

const Charts = ({ charts }) => (
  <Container className="m-4">
    <Row>
      {
          charts.map((chart) => {
            let statusPill;
            let logsButton;

            if (chart.status === 'DEPLOYED') {
              statusPill = (<Badge pill variant="success">Deployed</Badge>);
            } else if (chart.status === 'PENDING_UPGRADE') {
              statusPill = (<Badge pill variant="warning">Deploying</Badge>);
              logsButton = (<Button variant="secondary" className="ml-2">Deployment Logs</Button>);
            }

            return (
              <Col className="p-2" key={chart.name} xs={12} sm={6} md={6} lg={4}>
                <Card style={{ width: '18rem' }}>
                  <Card.Body>
                    <Card.Title>{chart.name}</Card.Title>
                    <p className="font-weight-light small">
Last Updated:
                      {chart.updated}
                    </p>
                    <Card.Text>
                      {statusPill}
                    </Card.Text>
                    <ButtonToolbar>
                      <Button variant="primary">Status</Button>
                      {logsButton}
                    </ButtonToolbar>
                  </Card.Body>
                </Card>
              </Col>
            );
          })
        }
    </Row>
  </Container>
);

Charts.propTypes = {
  charts: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    revision: PropTypes.string,
    updated: PropTypes.string,
    status: PropTypes.string,
  })).isRequired
};

export default Charts;
