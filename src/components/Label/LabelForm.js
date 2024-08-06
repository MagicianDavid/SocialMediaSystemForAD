import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LabelService from "../../services/LabelService";

const LabelForm = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [taglabel, setLabel] = useState({
        label:'',
        penaltyScore:'',
        colorCode: '#ffffff' 
    });
    const [error, setError] = useState('');


    useEffect(() => {
        if(id){
            LabelService.getLabelsById(id).then((response) => {
                let label = response.data;
                console.log("API Response:", label);
                setLabel({
                    label: label.label || '',
                    penaltyScore: label.penaltyScore || '',
                    colorCode: label.colorCode || '#ffffff' 
                })
            }).catch(error => {
                console.error("There was an error retrieving the label!", error);
            });
        }
    },[id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setLabel(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const saveOrUpdateLabel = (e) => {
        e.preventDefault(); // Prevent default form submission

        if (id) {
            LabelService.updateLabels(id, taglabel).then(() => {
                navigate('/labellist');
            }).catch(error => {
                if (error.response && error.response.status === 409) {
                    setError(error.response.data);
                } else {
                    console.error("There was an error updating the label", error);
                }
            });
        } else {
            LabelService.createLabels(taglabel).then(() => {
                navigate('/labellist');
            }).catch(error => {
                if (error.response && error.response.status === 409) {
                    setError(error.response.data);
                } else {
                    console.error("There was an error creating the label!", taglabel);
                }
            });
        }
    };


    const cancel = () => {
        navigate('/labellist');
    }

    return(
        <div>
            <h2>{id ? 'Update Label' : 'Add Label'}</h2>
            <form>
                <div>
                    <label>Label: </label>
                    <input type="text" name="label" value={taglabel.label} onChange={handleChange}/>
                </div>
                <div>
                    <label>Penalty Score: </label>
                    <input type="number" name="penaltyScore" value={taglabel.penaltyScore} onChange={handleChange}/>
                </div>
                <div>
                    <label>Color: </label>
                    <input 
                        type="color" 
                        name="colorCode" 
                        value={taglabel.colorCode}
                        onChange={handleChange} 
                    />
                        <input 
                            type="text" 
                            value={taglabel.colorCode} 
                            readOnly 
                            style={{ marginLeft: '10px', width: '80px' }}
                        />

                </div>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <button onClick={saveOrUpdateLabel}>{id ? 'Update' : 'Save'}</button>
                <button onClick={cancel}>Cancel</button>
            </form>
        </div>
    );

};

export default LabelForm;