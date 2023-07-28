import React, { useEffect, useState } from 'react';
import terms from '../../assets/terms.json';
import { useParams } from 'react-router-dom';
import TitleWrap from "../../components/common/TitleWrap";

const SettingTermDetail = () => {

    const [html, setHtml] = useState('');

    const pathParams = useParams();

    useEffect(() => {
        const index = pathParams.index as string;

        if (parseInt(index) === 1) {
            setHtml(terms.serviceUseTerm);
        } else if (parseInt(index) === 2) {
            setHtml(terms.privateDataTerm);
        }
    }, []);

    return (
        <div className="terms-detail">
            <TitleWrap title=""  />
            <div dangerouslySetInnerHTML={{__html : html}}></div>
        </div>
    );
};

export default SettingTermDetail;
