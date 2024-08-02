import styles from './flyout.module.css';
import { useSearch } from '../../../../../shared/hooks/useSearch.tsx';
import { useContext, useRef } from 'react';
import { Context } from '../../../../../shared/context/contextProvider.tsx';
import { getCharactersToExport } from '../../../api/helpers.ts';

function Flyout() {
  const { handleSetSelectedItemsCallback, selectedItemsWithDetails } =
    useSearch();
  const { themeIsDark } = useContext(Context);
  const linkRef = useRef(null);

  const handleDownload = () => {
    const charactersToExport = getCharactersToExport(selectedItemsWithDetails);
    const header = Object.keys(charactersToExport[0]);
    const csvRows = [];
    csvRows.push(header.join(','));
    for (const row of charactersToExport) {
      const values = header.map((key) => {
        const escaped = ('' + row[key]).replace(/"/g, '\\"');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(','));
    }

    const blob = new Blob([csvRows.join('\n')], {
      type: 'text/csv;charset=utf-8;',
    });
    const url = URL.createObjectURL(blob);
    if (linkRef.current) {
      linkRef.current.href = url;
      linkRef.current.download = `${charactersToExport.length}_characters.csv`;
      linkRef.current.click();
      URL.revokeObjectURL(url);
    }
  };
  return (
    <>
      <div
        className={` ${styles.flyoutWrapper} ${themeIsDark ? '' : styles.light} ${selectedItemsWithDetails.length === 0 ? styles.hiddenFlyout : ''}`}
        onClick={(e) => e.stopPropagation()}>
        <div>
          {selectedItemsWithDetails.length}{' '}
          {selectedItemsWithDetails.length > 1 ? 'items are' : 'item is'}{' '}
          selected
        </div>
        <button
          className={`${styles.flyoutButton} ${themeIsDark ? '' : styles.light}`}
          onClick={() => {
            handleSetSelectedItemsCallback(-1);
          }}
          disabled={selectedItemsWithDetails.length === 0}
          style={
            selectedItemsWithDetails.length === 0 ? { cursor: 'default' } : {}
          }>
          Unselect all
        </button>
        <button
          className={`${styles.flyoutButton} ${themeIsDark ? '' : styles.light}`}
          onClick={handleDownload}
          disabled={selectedItemsWithDetails.length === 0}
          style={
            selectedItemsWithDetails.length === 0 ? { cursor: 'default' } : {}
          }>
          Download
        </button>
        <a ref={linkRef} style={{ display: 'none' }} data-testid="link">
          Download
        </a>
      </div>
    </>
  );
}

export default Flyout;
