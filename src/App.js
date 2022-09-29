import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { usePapaParse } from 'react-papaparse';
import Ordercsv from './Ordercsv';
function App() {
  const { readRemoteFile } = usePapaParse();
  const [productsAvg, setProductsAvg] = useState([]);
  const [popularbrnd, setPopularBrnd] = useState([]);
  const [filename, setFilename] = useState("");

  // Reset product Avg and popular Brnd state
  useEffect(() => {
    setProductsAvg([]);
    setPopularBrnd([]);
  }, [filename]);

  // parse data from CSV file
  const handleReadOrdersFile = () => {
    let orders = {}, totalOrders = 0;
    readRemoteFile(`/order_log.csv`, {
      skipEmptyLines: true,
      step: (row) => {
        const { data } = row;
        if (!orders?.[data[2]]) {
          orders[data[2]] = { totQty: 0, brands: {} };
        }
        if (!orders?.[data[2]]?.brands?.[data[4]]) {
          orders[data[2]].brands[data[4]] = 0;
        }
        orders[data[2]].totQty += +data[3];
        orders[data[2]].brands[data[4]] += +data[3];
        totalOrders += 1;

      },
      complete: () => {
        const tmpProductsAvg = [], tmpPopularbrnd = [];
        Object.keys(orders).forEach((key) => {
          const maxQty = Math.max(...Object.values(orders[key].brands));
          const popBrands = Object.keys(orders[key].brands).filter(
            (brand) => orders[key].brands[brand] === maxQty,
          );
          tmpProductsAvg.push({ Product: key, Average: parseFloat(orders[key].totQty / totalOrders).toFixed(2) });
          tmpPopularbrnd.push({ Product: key, PopularBrand: popBrands.join(',') });
        });
        setProductsAvg(tmpProductsAvg);
        setPopularBrnd(tmpPopularbrnd);
      },
    });
  };

  // form submit 
  const handleSubmit = (e) => {
    e.preventDefault();
    handleReadOrdersFile();
  };

  return (
    <div className="App">
      <header role="heading" className="App-header" aria-level="1">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <code>Exercise 2:</code> Problem solving case
        </p>
      </header>
      {/* FORM BLOCK START */}
      <form id="msform" onSubmit={handleSubmit}>
        <input type="text" data-testid="filename-input" id="usernameInput" value={filename} onChange={(e) => setFilename(e.target.value)} required placeholder="Filename" />
        <input type="submit" className="submit action-button" value="Submit" data-testid="filename-input-sub-button" disabled={!filename || filename.trim() === ''} />
      </form>
      {/* FORM BLOCK END */}
      {filename && productsAvg?.length > 0 && popularbrnd?.length > 0 && (
        <section className="container order-csv-block">
          <div className="left-half">
            <Ordercsv data={productsAvg} filename={`0_${filename}`} />
          </div>
          <div className="right-half">
            <Ordercsv data={popularbrnd} filename={`1_${filename}`} />
          </div>
        </section>
      )}
    </div>
  );
}

export default App;
