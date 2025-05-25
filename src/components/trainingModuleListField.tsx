import { useEffect, useState } from 'react';
import { useClient, useFormValue } from 'sanity';
import { Label, Stack } from '@sanity/ui';

export function TrainingModuleListField(props: any) {
  const { value } = props;
  const [ timeText, setTimeText ] = useState('');
  const [ totalMinutes, setTotalMinutes ] = useState(0);

  const sanityClient = useClient({ apiVersion: '2025-04-15' }).withConfig({ perspective: 'raw'});
  const startTime = useFormValue([ 'date_time' ]) as string;

  useEffect(
      () => {
        async function fetchModules() {
          if (!value) {
            return;
          }
          
          const moduleIds = value.filter((module: any) => module).map((module: any) => module._ref);
          const modules = await sanityClient.fetch(
              `*[_type == "module" && _id in $moduleIds] {
                _id,
                minutes,
              }`,
              { moduleIds },
          );

          const minutesByModuleId = new Map();
          modules.forEach((module: any) => minutesByModuleId.set(module._id, module.minutes));

          const totalMinutes = moduleIds
              .filter((id: string) => minutesByModuleId.has(id))
              .map((id: string) => minutesByModuleId.get(id))
              .reduce((total: number, value: number) => total + value, 0);
          setTotalMinutes(totalMinutes);

          if (startTime) {
            const endTime = new Date(startTime);
            endTime.setMinutes(endTime.getMinutes() + totalMinutes);
            setTimeText(`${formatTimeText(new Date(startTime))} - ${formatTimeText(endTime)} / `);
          }
        }

        fetchModules();
      },
      [value],
  );

  return <Stack space={4}>
    {props.renderDefault(props)}
    <Label muted size={4}>
      {timeText}{totalMinutes} min
    </Label>
  </Stack>
}

function formatTimeText(date: Date): string {
  return date.toLocaleTimeString(
      "en-GB",
      {
        timeStyle: "short",
        timeZone: "Europe/Oslo",
      }
  );
}
