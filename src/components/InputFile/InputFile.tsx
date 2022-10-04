import React from 'react';
import cn from 'classnames';

import styles from './InputFile.module.scss';
import InputError from '../InputError';
import Translations from '../../constants/translations';
import FileThumbnail from '../FileThumbnail';

interface IInputFileProps {
  label?: string;
  name: string;
  value?: File[];
  error?: string;
  className?: string;
  onChange: (value: File[]) => void;
}

const InputFile = React.forwardRef<HTMLInputElement, IInputFileProps>((props, ref) => {
  const { label, name, value: files, className, error, onChange } = props;

  const classes = React.useMemo(() => {
    return cn(styles.container, className);
  }, [className]);

  const handleChange = React.useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const { files: newFiles } = e.target;

      const newFilesArray: File[] = newFiles ? Array.from(newFiles) : [];

      onChange(newFilesArray);
    },
    [onChange],
  );

  return (
    <div className={classes}>
      {!!label && <div className={styles.label}>{label}</div>}

      <div className={styles.list}>
        {files?.map((file, i) => {
          // eslint-disable-next-line react/no-array-index-key
          return <FileThumbnail key={i} file={file} />;
        })}

        <label htmlFor={name} className={styles.addBtn}>
          <span className={styles.addText}>{Translations.ru.browseFile}</span>

          <input
            type="file"
            ref={ref}
            multiple
            id={name}
            name={name}
            className={styles.input}
            onChange={handleChange}
          />
        </label>
      </div>

      {!!error && <InputError className={styles.error}>{error}</InputError>}
    </div>
  );
});

export default InputFile;
