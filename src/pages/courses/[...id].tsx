import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { getCourseById } from '../../services/db/courses/getCourseById'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { BsPencilSquare, BsPlus } from 'react-icons/bs'
import { useAuth } from '../../contexts/auth'
import { toast } from 'react-hot-toast'
import { Modal } from '../../components/Courses/Reviews/Modal'
import { addCourseReview } from '../../services/db/courses/courseReview/addCourseReview'
import { updateCourseReview } from '../../services/db/courses/courseReview/updateCourseReview'
import ReactStars from 'react-stars'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { TiTick } from 'react-icons/ti'
import { deleteCourseReview } from '../../services/db/courses/courseReview/deleteCourseReview'
import { Player } from '@lottiefiles/react-lottie-player'
import { UpvoteButton } from '../../components/Common/UpvoteButton'
import { removeCourseReviewUpvote } from '../../services/db/courses/courseReview/courseReviewUpvote/removeUpvote'
import { upvoteCourseReview } from '../../services/db/courses/courseReview/courseReviewUpvote/upvote'

const dummyCourse = {
    id: 1,
    sno: '1.',
    upvotes: 10,
    title: 'Quantum Computing',
    code: 'CS555',
    uploadedBy: 'John Doe',
    instructor: 'Mr.Dhiman',
    reviews: [
      {
        user_id: 1,
        rating: 4,
        comment: 'This is a dummy review.',
        upvotes: [
                { user_id: "3" },
                { user_id: "2" },
                { user_id: "1" },
            ],
        anonymous: false,
        user: {
          name: 'Dummy User',
        },
      },
      {
        user_id: 2,
        rating: 1,
        comment: 'Galti se bhi mat lena',
        upvotes: [
            { user_id: "3" },
            { user_id: "2" },
            { user_id: "1" },
        ],
        anonymous: false,
        user: {
          name: 'MOONLIGHT',
        },
      },
      {
        user_id: 3,
        rating: 1,
        comment: 'Best Course Eva',
        upvotes: [],
        anonymous: false,
        user: {
          name: 'MOONLIGHT',
        },
      },
    ],
  };
  
  const dummyCourse2 = {
    id: 2,
    sno: '2.',
    upvotes: 5,
    title: 'Web Development Advanced',
    code: 'WD102',
    uploadedBy: 'Jane Doe',
    instructor: 'Mrs. Advanced',
    reviews: [
      {
        user_id: 4,
        rating: 5,
        comment: 'Excellent content!',
        upvotes: [
            { user_id: "3" },
            { user_id: "2" },
        ],
        anonymous: false,
        user: {
          name: 'Advanced User',
        },
      },
      {
        user_id: 5,
        rating: 3,
        comment: 'Needs improvement',
        upvotes: [],
        anonymous: true,
        user: null,
      },
      {
        user_id: 6,
        rating: 4,
        comment: 'Very informative',
        upvotes: [
            { user_id: "3" },
            { user_id: "2" },
            { user_id: "1" },
        ],
        anonymous: false,
        user: {
          name: 'InfoSeeker',
        },
      },
    ],
  };
  

const Course: NextPage = ({}) => {
    //? router
    const router = useRouter()

    //? states
    const [course, setCourse] = useState<any>(null)
    const [reviews, setReviews] = useState<any[]>([])
    const [selectedCourseReview, setSelectedCourseReview] = useState<any>(null)
    const [isDataFetching, setIsDataFetching] = useState<boolean>(false)
    const [alreadyReviewed, setAlreadyReviewed] = useState<boolean>(false)
    const [showAddReviewModal, setShowAddReviewModal] = useState<boolean>(false)
    const [showUpdateReviewModal, setShowUpdateReviewModal] =
        useState<boolean>(false)

    //? contexts
    const { user, loading }: any = useAuth()

    //? functions
    const sortReviews = (reviews: Array<any>) => {
        reviews.sort((reviewA: any, reviewB: any) =>
            reviewA.upvotes.length > reviewB.upvotes.length ? -1 : 1
        )
        if (user) {
            const userReviews = reviews.filter(
                (review) => user.user_id === review.user_id
            )
            const restReviews = reviews.filter(
                (review) => !(user.user_id === review.user_id)
            )

            return [...userReviews, ...restReviews]
        } else return reviews
    }
    

    const refetchReviews = () => {
        setIsDataFetching(true)
        if (router.query.id) {
            const id = parseInt(router.query.id[0])
            getCourseById({ id }).then((res) => {
                setReviews(dummyCourse.reviews)
                setIsDataFetching(false)
            })
        }
    }

    //? effects
    useEffect(() => {
        setIsDataFetching(true);
        if (router.query.id) {
          const id = parseInt(router.query.id[0]);
          if (id === 1) {
            setCourse(dummyCourse);
            setReviews(dummyCourse.reviews);
          } else if (id === 2) {
            setCourse(dummyCourse2);
            setReviews(dummyCourse2.reviews);
          }
          setIsDataFetching(false);
        }
      }, [router]);

    useEffect(() => {
        if (selectedCourseReview) setShowUpdateReviewModal(true)
        else setShowUpdateReviewModal(false)
    }, [selectedCourseReview])

    useEffect(() => {
        if (user && reviews)
            reviews.find((review) => user.user_id === review.user_id)
                ? setAlreadyReviewed(true)
                : setAlreadyReviewed(false)
    }, [reviews, user])

    return (
        course && (
            <div className={`w-full bg-white flex flex-col`}>
                <Head>
                    <title>Course</title>
                    <meta
                        name="description"
                        content="Generated by create next app"
                    />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1"
                    />
                    <link
                        rel="icon"
                        href="/favicon.ico"
                    />
                </Head>
                {user && (
                    <Modal
                        header="Add Review"
                        actionButtonText="Add Review"
                        actionFunction={addCourseReview}
                        courseId={course.id}
                        refetch={refetchReviews}
                        showModal={showAddReviewModal}
                        setShowModal={setShowAddReviewModal}
                    />
                )}
                {selectedCourseReview && (
                    <Modal
                        header="Update Review"
                        actionButtonText="Update Review"
                        isUpdateModal={true}
                        courseId={course.id}
                        selectedEntity={selectedCourseReview}
                        actionFunction={updateCourseReview}
                        refetch={refetchReviews}
                        showModal={showUpdateReviewModal}
                        setShowModal={setShowUpdateReviewModal}
                    />
                )}
                <div className="grid grid-cols-5 gap-0 justify-center py-48 px-5 md:px-14 space-y-8 min-h-screen">
                    <div className="col-span-5 flex flex-wrap items-center justify-center gap-4 md:justify-between">
                        <div className="flex items-center gap-4">
                            <h3 className="font-bold text-gray-600 text-xl md:text-3xl">
                                Course:
                            </h3>
                            <h3 className="font-bold text-primary text-xl md:text-3xl">
                                {course.title}
                            </h3>
                        </div>
                        {alreadyReviewed ? (
                            <button
                                disabled={true}
                                type="button"
                                className="flex items-center space-x-2 px-2 py-1 duration-200 transition-all rounded-md shadow-md bg-primary text-white font-semibold disabled:bg-primary/70 disabled:cursor-not-allowed"
                            >
                                <TiTick className="h-8 w-8" />
                                <span className="text-sm md:text-base">
                                    Already Reviewed
                                </span>
                            </button>
                        ) : (
                            <button
                                disabled={loading}
                                onClick={() => {
                                    if (user) setShowAddReviewModal(true)
                                    else
                                        toast(
                                            'Please login to add new course',
                                            {
                                                icon: 'ℹ️',
                                            }
                                        )
                                }}
                                type="button"
                                className="flex items-center space-x-2 px-2 py-1 duration-200 transition-all rounded-md shadow-md hover:shadow-xl bg-primary text-white font-semibold disabled:bg-primary/70 disabled:cursor-wait"
                            >
                                <BsPlus className="h-8 w-8" />
                                <span className="text-sm md:text-base">
                                    Add Review
                                </span>
                            </button>
                        )}
                    </div>
                    <h2 className="font-semibold text-lg md:text-2xl">
                        Reviews
                    </h2>
                    <div className="col-span-5 flex flex-wrap justify-evenly gap-6 w-full">
                        {isDataFetching ? (
                            Array(8)
                                .fill({})
                                .map((res, index) => {
                                    return (
                                        <div
                                            key={index}
                                            role="status"
                                            className="shadow-md p-6 rounded-md animate-pulse"
                                        >
                                            <div className="h-2.5 bg-gray-400 rounded-full w-48 mb-4"></div>
                                            <div className="h-2 bg-gray-400 rounded-full max-w-[360px] mb-2.5"></div>
                                            <div className="h-2 bg-gray-400 rounded-full mb-2.5"></div>
                                            <div className="h-2 bg-gray-400 rounded-full max-w-[330px] mb-2.5"></div>
                                            <div className="h-2 bg-gray-400 rounded-full max-w-[300px] mb-2.5"></div>
                                            <div className="h-2 bg-gray-400 rounded-full max-w-[360px]"></div>
                                            <span className="sr-only">
                                                Loading...
                                            </span>
                                        </div>
                                    )
                                })
                        ) : reviews.length ? (
                            sortReviews(reviews).map((review: any) => {
                                return (
                                    <div
                                        className="shadow-xl w-[20rem] duration-150 transition-all p-6 rounded-md flex flex-col justify-between space-y-3"
                                        key={review.id}
                                    >
                                        <div className="flex flex-col gap-4">
                                            <div className="flex gap-6 justify-between">
                                                <ReactStars
                                                    count={5}
                                                    edit={false}
                                                    value={review.rating}
                                                    size={30}
                                                    color2={'#ffd700'}
                                                />
                                                {user &&
                                                    user.user_id ===
                                                        review.user_id && (
                                                        <div className="flex items-center gap-1">
                                                            <button
                                                                className="p-2 rounded-full hover:bg-gray-200 duration-150"
                                                                onClick={(e) =>
                                                                    setSelectedCourseReview(
                                                                        review
                                                                    )
                                                                }
                                                            >
                                                                <BsPencilSquare className="h-5 w-5 text-primary" />
                                                            </button>
                                                            <button
                                                                className="p-2 rounded-full hover:bg-gray-200 duration-150"
                                                                onClick={(
                                                                    e
                                                                ) => {
                                                                    deleteCourseReview(
                                                                        {
                                                                            id: review.id,
                                                                            refetch:
                                                                                refetchReviews,
                                                                        }
                                                                    )
                                                                }}
                                                            >
                                                                <RiDeleteBin6Line className="h-5 w-5 text-red-500" />
                                                            </button>
                                                        </div>
                                                    )}
                                            </div>
                                            <div className="flex flex-col gap-3 w-full">
                                                <p className="font-semibold">
                                                    Review:
                                                </p>
                                                <p>{review.comment}</p>
                                            </div>
                                        </div>
                                        <div className="flex justify-between w-full">
                                            {review.anonymous ? (
                                                <p className="font-semibold text-gray-600 italic whitespace-nowrap">
                                                    ~ Anonymous
                                                </p>
                                            ) : (
                                                <p className="font-semibold text-gray-600 italic whitespace-nowrap">
                                                    ~ {review.user.name}
                                                </p>
                                            )}
                                            <UpvoteButton
                                                id={review.id}
                                                users={review.upvotes}
                                                upvotesCount={review.upvotes.length} 
                                                removeUpvoteHandler={
                                                    removeCourseReviewUpvote
                                                }
                                                upvoteHandler={
                                                    upvoteCourseReview
                                                }
                                            />
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <div className="col-span-5 pt-24 w-full flex flex-col items-center justify-center">
                                <Player
                                    autoplay={true}
                                    loop={true}
                                    className="h-56 w-56"
                                    src="https://assets7.lottiefiles.com/packages/lf20_ttvteyvs.json"
                                />
                                <span className="font-bold text-2xl text-gray-700">
                                    No Reviews Found
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    )
}

export default Course
