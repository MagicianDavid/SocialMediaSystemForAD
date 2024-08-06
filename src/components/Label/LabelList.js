import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import LabelService from '../../services/LabelService';

class LabelList extends Component {
    constructor(props){
        super(props);
        this.state = {
            labels:[]
        }
    }

    componentDidMount(){
        this.loadLabel();
    }

    loadLabel(){
        LabelService.getAllLabels().then((response) => {
            this.setState({labels: response.data});
        }).catch((error) => {
            console.error('There was an error!', error);
        });
    }

    render () {
        const { navigate } = this.props;
        return(
            <div>
                <h2>Label List</h2>
                <button onClick={() => navigate('/labels/add')}>Add New Label</button>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Label</th>
                            <th>Penalty Score</th>
                            <th>Color Code</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.labels.map(label => (
                        <tr key={label.id}>
                            <td>{label.id}</td>
                            <td>{label.label}</td>
                            <td>{label.penaltyScore}</td>
                            <td>{label.colorCode}</td>
                            <td>
                                <button onClick={() => navigate(`/labels/edit/${label.id}`)}>Edit</button>
                                <button onClick={() => this.deleteLabel(label.id)}>Delete</button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    deleteLabel(id){
        LabelService.deleteLabels(id).then(() => {
            this.loadLabel();
        });
    }
};

const LabelListWithNavigate = (props) => {
    const navigate = useNavigate();
    return <LabelList {...props} navigate={navigate}/>;
}

export default LabelListWithNavigate;

