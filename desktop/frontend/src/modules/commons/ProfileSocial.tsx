import React, { useState } from 'react';
import { InputMask } from "primereact/inputmask";
import { ToggleButton } from 'primereact/togglebutton';
import { InputText } from 'primereact/inputtext';

const ProfileSocial = ({ img, icon, colorIcon, mask, id, placeholder, checked }: ProfileProps) => {
  const [checke, setChecked] = useState(checked);
  return (
    <div className="p-inputgroup flex-1 h-10 mb-5">
      <span className="p-inputgroup-addon">
        {img ? (
          <img src={icon} className='w-5 rounded' />
        ) : (
          <i className={icon} style={{ color: colorIcon }}></i>
        )}

      </span>
      {mask !== "" ? (
        <InputMask id={id} mask={mask} placeholder={placeholder}></InputMask>
      ) : (
        <InputText id={id} placeholder={placeholder} />
      )}

      <span className="p-inputgroup-addon">
        <ToggleButton onLabel="" offLabel="" onIcon="pi pi-eye" offIcon="pi pi-eye-slash"
          checked={checke} onChange={(e) => setChecked(e.value)} />
      </span>
    </div>
  );
};

type ProfileProps = {
  img?: boolean;
  icon: string;
  colorIcon: string;
  mask: string;
  id: string;
  placeholder: string;
  checked?: boolean;
};

export { ProfileSocial };
