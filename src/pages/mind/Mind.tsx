import React from 'react';
import TitleWrap from '../../components/common/TitleWrap';
import InputTextBoxWithArrow from '../../components/common/InputTextBoxWithArrow';
import RadioWrap from '../../components/common/RadioWrap';

const Mind = () => {
  return (
    <div className="Friend inner">
      <TitleWrap title="마음 기록하기" />
      <form className='friend-register-wrap'>
        <RadioWrap
          inputTitle=''
          options={
            [
              {
                name : 'type',
                id : 'give',
                htmlFor : 'give',
                content : '준 마음'
              }, {
                name : 'type',
                id : 'take',
                htmlFor : 'take',
                content : '받은 마음'
              }
            ]
          }
        />
        <InputTextBoxWithArrow
          inputTitle='이름 (필수)'
          placeholder='기록할 친구들을 선택하세요.'
          id='friends'
          value=''
          onChange=''
          onClick=''
        />
        
      </form>
    </div>
  );
};

export default Mind;