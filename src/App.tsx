import React, {useEffect, useState} from 'react';
import './App.css';
import {Button, Checkbox, ConfigProvider, Input, Radio, RadioChangeEvent, Space, Switch} from "antd";
import {CheckboxValueType} from "antd/es/checkbox/Group";

function App() {

    const data={
        isProficient:true,
        /**
         * values for toolsUsed. Please note that the values are stored in a string, not an array
         * 0:	Redux
         * 1:	Lodash
         * 2:	Ant design
         * 3:	Webpack
         * 4:	Other
         */
        toolsUsed:"0,2,3,4",
    }

    const dict: { [key: string]: string } = {
        "0": "Redux",
        "1": "Lodash",
        "2": "Ant design",
        "3": "Webpack",
        "4": "Other"
    }

    const plainOptions = ['Redux', 'Lodash', 'Ant design','Webpack','Other'];
    let defaultCheckedList : string[] = data.toolsUsed.split(",").map(item => dict[item]);

    const [disabled, setDisabled] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [value, setValue] = useState(data.isProficient ? 2 : 1);
    const [checkedList, setCheckedList] = useState<CheckboxValueType[]>(defaultCheckedList);
    const CheckboxGroup = Checkbox.Group;


    const onChange = (list: CheckboxValueType[]) => {
        setCheckedList(list);
        console.log(list)
    };
    const handleChangeSwitch = (state: boolean) => {
        const handles = document.getElementsByClassName('ant-switch-handle')
        const buttons = document.getElementsByClassName('ant-btn')

        for (let i = 0; i < handles.length; i++){
            if(state){
                handles[i].classList.remove('switch-disabled')
            } else {
                handles[i].classList.add('switch-disabled')
            }
        }
        for (let i = 0; i < buttons.length; i++){
            if(state){
                buttons[i].classList.remove('btn-disabled')
            } else {
                buttons[i].classList.add('btn-disabled')
            }
        }
        setDisabled(!state);
    };
    const handleFirstName = (e:any) => {
        setFirstName(e.target.value);
    };
    const onChangeRadio = (e: RadioChangeEvent) => {
        console.log('radio updated:', e.target.value);
        setValue(e.target.value);
        data.isProficient = e.target.value !== 1
    };

    useEffect(()=>{
        const inputElement = document.getElementById('input_fn');
        if (inputElement) {
            if (disabled) {
                inputElement.classList.add('invisible');
            } else {
                inputElement.classList.remove('invisible');
            }
        }
    },[disabled])

    const handleSubmit = () => {
        console.log(`Is proficient: ${value}\nTools used:${checkedList}`)
    }

    return (
      <ConfigProvider
          theme={{
              token: {
                  colorPrimary: '#6043dc',

              },
              components: {
                  Radio :{

                  },
                  Checkbox: {
                      borderRadiusSM: 10,
                  }
              }
          }}
      >
          <div className="App flex justify-center items-center h-screen">
              <div className="form bg-white">
                  <div className="form-container p-5">
                      <div className="row flex justify-between mb-6">
                          Editable
                          <Switch className="" defaultChecked onChange={handleChangeSwitch} />
                      </div>
                      <div className="row mb-6" id="input_fn">
                          <Input placeholder="First name"
                                 value={firstName}
                                 onChange={handleFirstName} />
                      </div>
                      <div className="question capitalize font-bold text-2xl flex flex-col">
                        Are you proficient in ReactJS development?
                          <Radio.Group buttonStyle="solid" disabled={disabled} onChange={onChangeRadio} value={value}>
                              <Space direction="vertical" className="font-normal">
                                  <Radio value={1}>No</Radio>
                                  <Radio value={2}>Yes</Radio>
                              </Space>
                          </Radio.Group>
                      </div>
                      <br/>
                      <div className="question capitalize font-bold text-2xl flex flex-col mb-12">
                          Which tools do you use?
                          <div className="font-normal text-base text-gray-500">Please select all that apply.</div>
                          <CheckboxGroup className="font-normal grid" options={plainOptions} disabled={disabled} value={checkedList} onChange={onChange} />

                      </div>
                      <div className="flex justify-center">
                          <Button className="w-1/2 h-12 rounded-3xl" disabled={disabled} onClick={handleSubmit} type="primary" htmlType="submit" size="large">
                              Process
                          </Button>
                      </div>
                  </div>
              </div>
          </div>
      </ConfigProvider>
  );
}

export default App;
