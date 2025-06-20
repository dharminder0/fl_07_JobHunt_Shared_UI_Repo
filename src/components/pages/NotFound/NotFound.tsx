import { ArrowBack } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';

interface NotFoundProps {}

const NotFound: React.FC<NotFoundProps> = () => {
  const navigation = useNavigate();
  const activeRole = localStorage.getItem("activeRole") || "";

  return (
    <div className="container">
        <div className="error-page-404">
            <div className="error-message">
                <h1>4<i className="svg404"></i>4</h1>
                <h2>Congratulations! <span>You are one of the elite few who has managed to find our 404 page.</span></h2>
                <p className='mb-4'><b>Don't worry - </b>this is not a dead end. Looks like you tried to open a page which is not available.<br/> Please enter correct page url and try again.</p>
                <Button size='small' variant='outlined' onClick={()=> navigation(`/${activeRole}/dashboard`)} startIcon={<ArrowBack/>}>Back to dashboard</Button>
            </div>
        </div>
    </div>
  );
};

export default NotFound;
