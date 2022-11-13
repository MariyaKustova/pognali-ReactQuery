import { FC, useCallback, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import classnames from "classnames";

import BaseInput from "../../../../components/common/BaseInput/BaseInput";
import { profileAPI } from "../../../../redux/API/profile";
import { ResponseDataBase, ResponseMe } from "../../../Login/types";

import s from "./ProfileStatus.module.scss";

interface ProfileStatusProps {
  userId: number;
  setError: (error: Error | null) => void;
}

const ProfileStatus: FC<ProfileStatusProps> = ({ userId, setError }) => {
  const queryClient = useQueryClient();

  const currentUserId =
    queryClient.getQueryData<ResponseDataBase<ResponseMe>>("auth")?.data.id;

  const isOwner = currentUserId === userId;

  const queryStatus = useQuery<string | undefined, Error>({
    queryKey: ["status", userId],
    queryFn: () => profileAPI.getStatus(userId),
    enabled: !!userId,
  });

  const mutateStatus = useMutation<
    ResponseDataBase<{}> | undefined,
    Error,
    string
  >((status: string) => profileAPI.updateStatus(status), {
    onSuccess: () => queryClient.invalidateQueries(["status", currentUserId]),
  });
  const [userStatus, setUserStatus] = useState<string>(queryStatus.status);
  const [editMode, setEditMode] = useState<boolean>(false);

  useEffect(() => {
    if (queryStatus.isError || mutateStatus.isError) {
      setError(queryStatus.error || mutateStatus.error);
    }
  }, [
    queryStatus.isError,
    mutateStatus.isError,
    setError,
    queryStatus.error,
    mutateStatus.error,
  ]);

  const onToggleEditMode = useCallback(() => {
    setEditMode((prevState) => !prevState);
  }, []);

  const onChangeStatus = useCallback(() => {
    mutateStatus.mutate(userStatus);
    onToggleEditMode();
  }, [onToggleEditMode, userStatus, mutateStatus]);

  return (
    <div
      className={classnames(s.ProfileStatus, {
        [s.ProfileStatus__Owner]: isOwner,
      })}
    >
      {editMode && isOwner ? (
        <div className={s.ProfileStatus__Modal}>
          <span className={s.ProfileStatus__Hint}>Input your status</span>
          <BaseInput
            value={userStatus}
            onBlur={onChangeStatus}
            onChange={(e) => setUserStatus(e.target.value)}
            className={s.ProfileStatus__input}
          />
        </div>
      ) : (
        <div onClick={onToggleEditMode}>
          {queryStatus.data || isOwner ? "Set your status" : ""}
        </div>
      )}
    </div>
  );
};

export default ProfileStatus;
