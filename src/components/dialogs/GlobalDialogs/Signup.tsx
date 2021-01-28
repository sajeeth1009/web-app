import React from 'react';
import Dialog from '../Dialog';
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../store/rootReducer';
import { closeDialog, openDialogWithoutPayload } from '../../../store/dialogSlice';


interface SignupProps {
}

const Signup: React.FC<SignupProps> = (props) => {
  const dialogState = useSelector((state: RootState) => state.dialog)
  const open = dialogState.config?.type === 'signup';

  const dispatch = useDispatch();


  const handleClose = () => {
    dispatch(closeDialog())
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      ariaLabelledBy="loginDialogTitle"
    >
      <div className="bg-primary d-flex px-3 py-2a align-items-center">
        <h4 id="loginDialogTitle" className="flex-grow-1 m-0 fw-bold text-white">Signup dialog</h4>
        <button type="button"
          onClick={handleClose}
          className="btn-close btn-close-white" aria-label="Close"></button>
      </div>
      <div className="p-3">
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur exercitationem laudantium, quia placeat necessitatibus amet libero nemo facere. Amet laudantium perspiciatis saepe rerum pariatur voluptates consequatur totam libero quam magnam.</p>
        <button onClick={() => dispatch(openDialogWithoutPayload('login'))}>Go to login</button>
      </div>
    </Dialog>
  );
};

export default Signup;