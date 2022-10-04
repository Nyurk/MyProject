import React from 'react';
import cn from 'classnames';

import styles from './FileThumbnail.module.scss';
import { RENDERABLE_IMAGE_TYPES } from '../../constants/formats';

interface IFileThumbnailProps {
  className?: string;
  file: File;
}

const FileThumbnail: React.FC<IFileThumbnailProps> = (props) => {
  const { className, file } = props;

  const classes = React.useMemo<string>(() => {
    return cn(styles.container, className);
  }, [className]);

  const url = React.useMemo<string>(() => {
    return URL.createObjectURL(file);
  }, [file]);

  React.useEffect(() => {
    // after mount

    return () => {
      // before unmount
      URL.revokeObjectURL(url);
    };
  }, [url]);

  return (
    <div className={classes}>
      {RENDERABLE_IMAGE_TYPES.includes(file.type) ? (
        <img src={url} alt="" />
      ) : (
        <div className={styles.file}>
          <div className={styles.name}>{file.name}</div>
          <div className={styles.size}>{file.size}</div>
        </div>
      )}
    </div>
  );
};

export default FileThumbnail;
