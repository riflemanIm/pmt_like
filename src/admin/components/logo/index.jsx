import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase } from '@mui/material';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';

// project import
import Logo from './LogoMain';
import config from '../../config';
import { requestVerion, useLayoutDispatch, useLayoutState } from '../../context/LayoutContext';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = ({ sx, to }) => {
  // global
  const state = useLayoutState();
  const dispatch = useLayoutDispatch();

  useEffect(() => {
    requestVerion(dispatch);
  }, []);

  console.log('state?.version', state?.version);
  return (
    <ButtonBase disableRipple component={Link} to={!to ? config.defaultPath : to} sx={sx}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Link to="/">
          <Logo />
        </Link>
        <Chip
          label={state?.version}
          variant="outlined"
          size="small"
          color="secondary"
          sx={{
            mt: 0.5,
            ml: 1,
            fontSize: '0.725rem',
            height: 20,
            '& .MuiChip-label': { px: 0.5 }
          }}
        />
      </Stack>
    </ButtonBase>
  );
};

LogoSection.propTypes = {
  sx: PropTypes.object,
  to: PropTypes.string
};

export default LogoSection;
