import React, {Component} from "react";
import './ResolvedList.css';
import ResolvedBox from "./ResolvedBox";

class ResolvedList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            resolved: [
                {
                    id: 5,
                    cameraId: 22,
                    image: 'https://avatars2.githubusercontent.com/u/199657?s=88&v=4'
                },
                {
                    id: 6,
                    cameraId: 32,
                    image: "./logo512.png"
                },
                {
                    id: 7,
                    cameraId: 42,
                    image: "./logo512.png"
                },
            ]
        }
    }


    render() {
        const todoEntries = this.state.resolved;

        return (
            <ul className="resolvedList">
                {
                    todoEntries.map(item => <ResolvedBox item={item}
                                                         showImage={this.props.showImage}/>)
                }
            </ul>
        );
    }


}

export default ResolvedList;