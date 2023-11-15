import React from 'react';
import { Nav } from 'react-bootstrap';

import OpenCreateButton from '../Buttons/OpenCreateButton';
import RenameButton from '../Buttons/RenameButton';
import FileTab from './FileTab';

export default function NavigationLeft({
  filesObject,
  jpath,
  changeFile,
  setShowModal,
  closeFile,
  disable,
  onboarding,
}) {
  const onboardingLimitation = (file) =>
    onboarding ? ['Onboarding.Starter', 'Onboarding.Starter-fork'].includes(file.name) : true;

  return (
    <Nav
      variant="pills mb-2 mt-2"
      activeKey={jpath}
      onSelect={(key) => {
        return changeFile(JSON.parse(key));
      }}
    >
      {Object.keys(filesObject)?.map(
        (key) =>
          onboardingLimitation(filesObject[key]) && (
            <FileTab key={key} file={filesObject[key]} closeFile={closeFile} jpath={jpath} disable={disable} />
          ),
      )}
      <Nav.Item className="me-1">
        <OpenCreateButton setShowModal={setShowModal} disable={disable} />
        <RenameButton setShowModal={setShowModal} disable={disable} />
      </Nav.Item>
    </Nav>
  );
}
