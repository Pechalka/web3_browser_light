import React, {Component} from 'react';
import CybLink from "./components/CybLink";

class NotFound extends Component {

    render() {
        return (
            <div>
                Not Found :(
                <CybLink dura='root.cyb'>Create </CybLink> this app!
            </div>
        );
    }
}

export default NotFound;
