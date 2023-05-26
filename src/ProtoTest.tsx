import { Message, load } from 'protobufjs';
import React, { useEffect } from 'react';

const ProtoTest = () => {

    const protoFile = require('./proto/awesome.proto');

    useEffect(() => {
        load(protoFile, function (err, root) {
            if (err) {
                throw err;
            }

            var AwesomeMessage = root?.lookupType("awesomepackage.AwesomeMessage");

            // protobuf에 넣을 데이터 정의
            var payload = { awesomeField: "AwesomeString" };

            // 선언한 protobuf 에 넣을 데이터가, 우리가 위에서 선언한 protobuf 데이터 schema에 맞는지 확인
            var errMsg = AwesomeMessage?.verify(payload);
            if (errMsg)
                throw Error(errMsg);

            // 위에서 선언한 데이터를 protobuf 형식으로 만들어 준다.
            var message = AwesomeMessage?.create(payload);

            //  protobuf 형식의 데이터를 Uint8Array(브라우저) 혹은 Buffer(node.js)형식으로 serialize 한다.
            var buffer = AwesomeMessage?.encode(message as Message).finish();
            // ... do something with buffer

            // protobuf 형식의 데이터를 Uint8Array(브라우저) 혹은 Buffer(node.js)형식으로 deserialize 한다.
            var message2 = AwesomeMessage?.decode(buffer as Uint8Array);

            // 여기 부터는 protobuf 데이터로 적절히 작업을 해줍시다 ㅎㅎ..

            // json 형식으로 변환
            var object = AwesomeMessage?.toObject(message2 as Message, {
                longs: String,
                enums: String,
                bytes: String,
                // ConversionOptions 참조
            });

            console.log(JSON.stringify(object));
        })
    }, []);

    return (
        <div>
            
        </div>
    );
};

export default ProtoTest;