import React from 'react';
import "../_styles/loader.css";
import { Row, Button, Col, Table } from 'react-bootstrap';

export class OffersComponent extends React.Component {

  render() {
    return (
      <div>
        <h2>Oferty</h2>
        <Table responsive="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Nazwa stanowiska</th>
              <th>Firma</th>
              <th>Data</th>
              <th title="0-złożona, 1-przyjęta, 2-W trakcie kwalifikacji, 3-Rozpatrzona">Etap</th>{/* etapy rekrutacji 0-złożona, 1-przyjęta, 2-W trakcie kwalifikacji, 3-Rozpatrzona */}
              <th>Status</th>{/* 0-przetwarzana, 1-przyjęta, 2-odrzucona, 3-anulowana */}
            </tr>
          </thead>
        </Table>
      </div>
    );
  }
}

