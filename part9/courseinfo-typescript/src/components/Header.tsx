import React from 'react';
import { HeaderType } from '../types';

const Header = ({ courseName }: HeaderType) => (
  <>
    <h1>{courseName}</h1>
  </>
);

export default Header;