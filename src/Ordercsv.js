import React from 'react';
import { usePapaParse, useCSVDownloader } from 'react-papaparse';

function Ordercsv(props) {
  const { jsonToCSV } = usePapaParse();
  const { CSVDownloader, Type, } = useCSVDownloader();
  return (
    <>
      {/* CSV BLOCK START */}
      {props.filename && props?.data?.length > 0 && (
        <>
          <h2 className="fs-title" data-testid="filename">{`${props.filename}.csv`}</h2>
          <textarea data-testid="file1-csv-data" value={jsonToCSV(props?.data, { header: false })} readOnly />
          <CSVDownloader
            type={Type.Button}
            config={{ header: false }}
            filename={`${props.filename}`}
            data={props?.data}
          >Download</CSVDownloader>
        </>
      )}
      {/* CSV BLOCK END */}
    </>
  );
}

export default Ordercsv;
