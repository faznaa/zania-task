import { useState, useEffect, useRef } from 'react';

export default function useAutoSave(apiUrl: string) {
    const [data, setData] = useState<any>([]);
    const [lastSaved, setLastSaved] = useState(''); 
    const [hasChanges, setHasChanges] = useState(false); 
    const [isSaving , setIsSaving] = useState(false);
    const saveInterval = useRef<NodeJS.Timeout | null>(null); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(apiUrl);
                const result = await response.json();
                setData(result.data); 
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); 

        return () => {
            if (saveInterval.current) {
                clearInterval(saveInterval.current);
            }
        };
    }, [apiUrl]);

    useEffect(() => {
        const lastSavedTime = localStorage.getItem('lastSaved');
        if (lastSavedTime) {
            setLastSaved(lastSavedTime);
        }
    }, []);

    useEffect(() => {
        saveInterval.current = setInterval(() => {
            if (hasChanges) {
                handleSave();
            }
        }, 5000);

        return () => clearInterval(saveInterval.current as NodeJS.Timeout); // Clean up interval on unmount
    }, [hasChanges, data]);

    const handleSave = async () => {
        if (!hasChanges) return;
        setIsSaving(true);

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ items: data }), 
            });

            if (response.ok) {
                const currentTime = new Date().toLocaleTimeString(); 
                setLastSaved(currentTime);
                localStorage.setItem('lastSaved', currentTime);
                setHasChanges(false);
            } else {
                console.error('Failed to save data');
            }
        } catch (error) {
            console.error('Error saving data:', error);
        } finally {
           setIsSaving(false)
        }
    };

    const updateData = (newData: any[]) => {
        setData(newData); 
        setHasChanges(true); 
    };

    return { items:data,isSaving, setItems:updateData, lastSaved };
}
