import React from 'react';
import appCss from './css/app.css';

class App extends React.Component {
    render() {
        return (
            <div>
                <h1 className={appCss.fontColor}>World</h1>
            </div>
        );
    }
}

export default App;
