import logo from './logo.svg';
import './App.css';
import {useState} from "react";
import { MDBInput } from 'mdb-react-ui-kit';
const { app  } = window.require('@electron/remote')
const scrape = window.require('website-scraper');
const SaveToExistingDirectoryPlugin = window.require('website-scraper-existing-directory');

function App() {

    const [link,setLink] = useState(null)

    const submitSearchHandle = (e) => {
        e.preventDefault();
        setLink(document.getElementById('form1').value)
        if (link){
            const options = {
                urls: [link],
                directory: app.getPath('temp')+'/webpage/',
                plugins: [ new SaveToExistingDirectoryPlugin() ]
            };
            scrape(options).then((result) => {console.log(result)});
        }
    }

  return (
    <div className={'app'}>
        <div className={'p-4 mb-4 d-flex justify-content-center align-items-center flex-column'}>
            <form onSubmit={submitSearchHandle} className="input-group">
                <MDBInput label='Rechercher' id='form1' type='text' />
                <button type="submit" className="btn btn-primary">
                    <i className="fas fa-search"></i>
                </button>
            </form>
        </div>
    </div>
  );
}

export default App;
