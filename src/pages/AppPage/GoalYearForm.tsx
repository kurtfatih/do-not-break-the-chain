import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Dialog } from '@mui/material';
import React, { useCallback } from 'react';

import DateSvg from '../../assets/date.svg';
// import { Card } from '../../components/Card';
import { Image } from '../../components/Image';
import { SmallFont } from '../../components/Typography';
import { useDateContext } from '../../context/DateContext';

export const GoalYearForm: React.FC = () => {
    const { changeYear, activeYear, activeMonthName } = useDateContext();
    const [openYearDialog, setOpenYearDialog] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
    const divRef = React.useRef<HTMLDivElement | null>(null);

    const handleOpenYearDialog = useCallback(() => {
        if (!divRef?.current) return;
        setAnchorEl(divRef.current);
        setOpenYearDialog(true);
    }, []);

    const handleCloseYearDialog = () => {
        // setAnchorEl(null);
        setOpenYearDialog(false);
    };

    React.useEffect(() => {
        setAnchorEl(divRef.current);
    }, [divRef]);

    return (
        <>
            <div
                ref={divRef}
                onClick={handleOpenYearDialog}
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    cursor: 'pointer',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    marginTop: '10px',
                }}
            >
                <SmallFont style={{ marginRight: '2px' }} upperCase>
                    {activeYear + '/' + activeMonthName}
                </SmallFont>
                <Image src={DateSvg} alt="date" width={20} height={20} />
            </div>
            <GoalYearDatePicker
                openYearDialog={openYearDialog}
                handleCloseYearDialog={handleCloseYearDialog}
                activeYear={activeYear}
                changeYear={changeYear}
                anchorEl={anchorEl}
            />
        </>
    );
};
export default GoalYearForm;

interface GoalYearDatePickerProps {
    openYearDialog: boolean;
    handleCloseYearDialog: () => void;
    activeYear: number;
    changeYear: (year: number) => void;
    anchorEl: HTMLDivElement | null;
}
const GoalYearDatePicker: React.FC<GoalYearDatePickerProps> = ({
    openYearDialog,
    handleCloseYearDialog,
    activeYear,
    changeYear,
    anchorEl,
}) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Dialog
                // PaperComponent={Card}
                open={openYearDialog}
                onClose={handleCloseYearDialog}
            >
                <DatePicker
                    PaperProps={{
                        style: {
                            display: 'flex',
                            backgroundColor: '#252d3b',
                            borderRadius: '10px',
                            padding: '10px',
                            justifyContent: 'space-between',
                            flexDirection: 'column',
                            color: 'white',
                        },
                    }}
                    PopperProps={{
                        // style: {
                        //     transform: 'translate(-50%, 0)',
                        //     top: '25%',
                        //     left: '50%',
                        //     // transform: 'translate(50%,-50%)',
                        //     // display: 'flex',
                        // },
                        anchorEl: anchorEl,
                    }}
                    open={openYearDialog}
                    value={new Date(activeYear, 0, 1)}
                    onChange={(e) => {
                        if (!e) return;
                    }}
                    //For mobile "ok" "cancel" button
                    onAccept={(e) => {
                        if (!e) return;
                        const getFullOfYear = e.getFullYear();
                        changeYear(getFullOfYear);
                        handleCloseYearDialog();
                    }}
                    onClose={() => handleCloseYearDialog()}
                    onYearChange={(e) => {
                        const getFullOfYear = e.getFullYear();
                        changeYear(getFullOfYear);
                        handleCloseYearDialog();
                    }}
                    views={['year']}
                    renderInput={() => <div> </div>}
                />
            </Dialog>
        </LocalizationProvider>
    );
};
