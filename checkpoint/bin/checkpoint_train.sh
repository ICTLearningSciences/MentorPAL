ARCH=$1
CHECKPOINT=$2

PROJECT_ROOT=$(git rev-parse --show-toplevel 2> /dev/null)
CHECKPOINT_ROOT=${PROJECT_ROOT}/checkpoint
MENTOR_ROOT=${PROJECT_ROOT}/mentor

DOCKER_ACCOUNT=uscictdocker
DOCKER_REPO=mentorpal-classifier
DOCKER_TAG=latest

DOCKER_IMAGE=${DOCKER_ACCOUNT}/${DOCKER_REPO}:${DOCKER_TAG}
DOCKER_CONTAINER=mentorpal-classifier

docker run \
        -it \
        --rm \
        --name ${DOCKER_CONTAINER} \
        -v ${CHECKPOINT_ROOT}:/app/checkpoint \
        -v ${PROJECT_ROOT}/src/mentorpal:/app/mentorpal \
        -v ${PROJECT_ROOT}/mentors:/app/mentors \
        -e ARCH=${ARCH} \
        -e CHECKPOINT=${CHECKPOINT} \
        -e MENTOR_ROOT=${MENTOR_ROOT} \
        --workdir /app \
        --entrypoint /app/checkpoint/bin/checkpoint_train.py \
    ${DOCKER_IMAGE}