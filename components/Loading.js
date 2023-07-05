import React, { CSSProperties } from 'react'
import { BeatLoader } from 'react-spinners';
import styles from '../styles/loading.module.css'

export default function Loading() {

    const override = {
        display: "block",
        margin: '0 auto',
        position:'absolute',
        left:'50%',
        top:'50%',
        transform:'translate(-50%,-50%)',
      };
      
  return (
    <div className={styles.overlay}>
    <BeatLoader color="#fff" cssOverride={override}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader" />
  </div>
  )
}
