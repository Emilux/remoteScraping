import logo from './logo.svg';
import './App.css';
import {useState} from "react";
import { MDBInput } from 'mdb-react-ui-kit';
const { app  } = window.require('@electron/remote')
const scrape = window.require('website-scraper');
const SaveToExistingDirectoryPlugin = window.require('website-scraper-existing-directory');

function App() {

    const [isScraped,setIsScraped] = useState(true)
    const [isError,setIsError] = useState(false)
    const [currentUrl,setCurrentUrl] = useState(null)

    const submitSearchHandle = (e) => {
        e.preventDefault();
        setIsScraped(false);
        setIsError(false);
        const link = document.getElementById('form1').value
        if (link){
            const options = {
                urls: [link],
                directory: app.getPath('temp')+'/webpage/',
                plugins: [ new SaveToExistingDirectoryPlugin() ]
            };
            scrape(options)
                .then((result) => {
                    setIsScraped(true);
                    setCurrentUrl(link)
                })
                .catch((e) => {
                    setIsScraped(true);
                    setIsError(true);
                });
        } else {
            setIsScraped(true);
            setIsError(true);
        }
    }

  return (
    <div className={'app'}>
        <div className={'p-4 mb-4 d-flex justify-content-center align-items-center flex-column'}>
            <form onSubmit={submitSearchHandle} className="input-group">
                <MDBInput onClick={() => setIsError(false)} label={isScraped ? 'Rechercher' : 'Chargement...'} id='form1' type='text' />
                <button type="submit" className={`btn btn-${isError ? "danger" : "primary"}`}>
                    {
                        isScraped ?
                            <i className={`fas fa-${isError ? "times" : "search"}`}></i>
                            :
                            <i className="fas fa-cog fa-spin"></i>
                    }
                </button>
            </form>
            {currentUrl ?
                <div>
                    <span>URL courant : </span>
                    {currentUrl}
                </div>
                : ""
            }
        </div>
    </div>
  );
}

export default App;
