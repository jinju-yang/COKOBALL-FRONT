import { ReactComponent as Writebutton } from '../../../src/assets/svg/writebutton.svg';
import { motion } from 'framer-motion';

function WriteBtn({onClick}) {
  return (
    <motion.div
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      onClick={onClick}
    >
      <Writebutton />
    </motion.div>
  );
}

export default WriteBtn;
