import React, {Component} from "react";
import './ResolvedList.css';
import ResolvedBox from "./ResolvedBox";

class ResolvedList extends Component {
    render() {
        return (
            <ul className="resolvedList">
                {
                    this.props.entries.map(item => <ResolvedBox item={item}
                                                                showImage={this.props.showImage}
                                                                undo={this.props.undo} />)
                }
            </ul>
        );
    }


}

export default ResolvedList;