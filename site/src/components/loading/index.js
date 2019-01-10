import React from 'react';
import { ClipLoader } from 'react-spinners';
 
export default class Loading extends React.Component {
  render() {
    const loading = this.props.loading;
    return (
      <div className='sweet-loading text-center'>
        <ClipLoader
          sizeUnit={"px"}
          size={50}
          color={'#123abc'}
          loading={loading.bool}
        />
        <h3>{loading.msg}</h3>
      </div> 
    )
  }
}