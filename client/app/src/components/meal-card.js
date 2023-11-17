import React from 'react';
import styled from '@emotion/styled';
import { Card as MuiCard, CardContent, Typography } from '@mui/material';


const CardWrapper = styled(MuiCard)`
  position: relative;
  width: 250px;
  height: 250px;
  color: #2e2d31;
  background: #131313;
  overflow: hidden;
  border-radius: 20px;
  box-shadow: 0px 5px 22px rgba(0, 0, 0, 0.04), 0px 0px 0px 0.5px rgba(0, 0, 0, 0.03);

  .temporary_text {
    font-weight: bold;
    font-size: 24px;
    padding: 6px 12px;
    color: #f8f8f8;
  }

  .card_content {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 20px;
    background: #f2f2f2;
    border-top-left-radius: 20px;
    transform: translateY(80px);
    transition: transform .25s;

    &::before {
      content: '';
      position: absolute;
      top: -47px;
      right: -45px;
      width: 100px;
      height: 100px;
      transform: rotate(-175deg);
      border-radius: 50%;
      box-shadow: inset 48px 48px #f2f2f2;
    }

    .card_title {
      color: #131313;
      line-height: 15px;
      font-weight: bold;
    }

    .card_subtitle {
      display: block;
      font-size: 12px;
      margin-bottom: 10px;
    }

    .card_description {
      font-size: 14px;
      opacity: 0;
      transition: opacity .5s;
    }
  }

  &:hover .card_content {
    transform: translateY(0);
  }

  &:hover .card_description {
    opacity: 1;
    transition-delay: .25s;
  }
`;

const Card = ({ image, creationDate, participantId, portion, type, studyId }) => (
  <CardWrapper>
    <div className="temporary_text">{image}</div>
    <CardContent className="card_content">
      <Typography variant="subtitle2" className="card_title">{creationDate}</Typography>
      <Typography variant="body2" className="card_subtitle">Participant ID: {participantId}</Typography>
      <Typography variant="body2" className="card_description">Portion: {portion}</Typography>
      <Typography variant="body2" className="card_description">Type: {type}</Typography>
      <Typography variant="body2" className="card_description">Study ID: {studyId}</Typography>
    </CardContent>
  </CardWrapper>
);

export default Card;
